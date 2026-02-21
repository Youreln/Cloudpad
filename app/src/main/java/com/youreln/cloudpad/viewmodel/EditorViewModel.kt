package com.youreln.cloudpad.viewmodel

import android.content.Context
import android.os.Environment
import android.provider.MediaStore
import androidx.compose.runtime.*
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextDecoration
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import com.youreln.cloudpad.data.AppDatabase
import com.youreln.cloudpad.data.Document
import com.youreln.cloudpad.utils.TextCleaner
import java.io.File
import java.io.FileOutputStream
import java.util.Date

class EditorViewModel(private val context: Context) {
    private val _documents = MutableStateFlow<List<Document>>(emptyList())
    val documents: StateFlow<List<Document>> = _documents.asStateFlow()

    private val _currentDocument = MutableStateFlow<Document?>(null)
    val currentDocument: StateFlow<Document?> = _currentDocument.asStateFlow()

    private val _content = MutableStateFlow("")
    val content: StateFlow<String> = _content.asStateFlow()

    private val _showDocumentList = MutableStateFlow(false)
    val showDocumentList: StateFlow<Boolean> = _showDocumentList.asStateFlow()

    private val _showRenameDialog = MutableStateFlow(false)
    val showRenameDialog: StateFlow<Boolean> = _showRenameDialog.asStateFlow()

    private val _showDeleteDialog = MutableStateFlow(false)
    val showDeleteDialog: StateFlow<Boolean> = _showDeleteDialog.asStateFlow()

    private val _renameText = MutableStateFlow("")
    val renameText: StateFlow<String> = _renameText.asStateFlow()

    private val _message = MutableStateFlow("")
    val message: StateFlow<String> = _message.asStateFlow()

    private val db = AppDatabase.getDatabase(context)
    private val scope = kotlinx.coroutines.CoroutineScope(Dispatchers.Main)
    private var autoSaveJob: kotlinx.coroutines.Job? = null

    init {
        loadDocuments()
        startAutoSave()
    }

    private fun loadDocuments() {
        scope.launch(Dispatchers.IO) {
            val docs = db.documentDao().getAllDocuments()
            _documents.value = docs
            if (docs.isNotEmpty()) {
                selectDocument(docs[0])
            } else {
                createNewDocument()
            }
        }
    }

    fun selectDocument(document: Document) {
        _currentDocument.value = document
        _content.value = document.content
        _showDocumentList.value = false
    }

    fun createNewDocument() {
        scope.launch(Dispatchers.IO) {
            val newDoc = Document(
                title = "新建文档 ${Date().time}",
                content = ""
            )
            val id = db.documentDao().insertDocument(newDoc)
            val createdDoc = db.documentDao().getDocumentById(id) ?: return@launch
            _documents.value = db.documentDao().getAllDocuments()
            selectDocument(createdDoc)
            _message.value = "新建文档成功"
        }
    }

    fun updateContent(newContent: String) {
        _content.value = newContent
    }

    private fun startAutoSave() {
        autoSaveJob = scope.launch(Dispatchers.IO) {
            while (true) {
                delay(3000) // 每3秒自动保存
                saveCurrentDocument()
            }
        }
    }

    private suspend fun saveCurrentDocument() {
        val doc = _currentDocument.value
        val content = _content.value
        if (doc != null && content != doc.content) {
            val updatedDoc = doc.copy(
                content = content,
                updatedAt = Date()
            )
            db.documentDao().updateDocument(updatedDoc)
            _currentDocument.value = updatedDoc
            _documents.value = db.documentDao().getAllDocuments()
            _message.value = "已自动保存"
        }
    }

    fun toggleDocumentList() {
        _showDocumentList.value = !_showDocumentList.value
    }

    fun showRenameDialog() {
        val doc = _currentDocument.value
        if (doc != null) {
            _renameText.value = doc.title
            _showRenameDialog.value = true
        }
    }

    fun hideRenameDialog() {
        _showRenameDialog.value = false
    }

    fun updateRenameText(text: String) {
        _renameText.value = text
    }

    fun renameDocument() {
        val doc = _currentDocument.value
        val newTitle = _renameText.value.trim()
        if (doc != null && newTitle.isNotEmpty()) {
            scope.launch(Dispatchers.IO) {
                val updatedDoc = doc.copy(
                    title = newTitle,
                    updatedAt = Date()
                )
                db.documentDao().updateDocument(updatedDoc)
                _currentDocument.value = updatedDoc
                _documents.value = db.documentDao().getAllDocuments()
                _showRenameDialog.value = false
                _message.value = "文档重命名成功"
            }
        }
    }

    fun showDeleteDialog() {
        _showDeleteDialog.value = true
    }

    fun hideDeleteDialog() {
        _showDeleteDialog.value = false
    }

    fun deleteDocument() {
        val doc = _currentDocument.value
        if (doc != null) {
            scope.launch(Dispatchers.IO) {
                db.documentDao().deleteDocument(doc)
                _documents.value = db.documentDao().getAllDocuments()
                val docs = _documents.value
                if (docs.isNotEmpty()) {
                    selectDocument(docs[0])
                } else {
                    createNewDocument()
                }
                _showDeleteDialog.value = false
                _message.value = "文档删除成功"
            }
        }
    }

    fun formatText(action: String) {
        val currentContent = _content.value
        val newContent = when (action) {
            "bold" -> currentContent // 简化处理，实际应使用AnnotatedString
            "italic" -> currentContent
            "underline" -> currentContent
            "strikethrough" -> currentContent
            "bullet_list" -> addBulletList(currentContent)
            "number_list" -> addNumberList(currentContent)
            else -> currentContent
        }
        _content.value = newContent
    }

    fun cleanText(action: String) {
        val currentContent = _content.value
        val newContent = when (action) {
            "remove_empty_lines" -> TextCleaner.removeEmptyLines(currentContent)
            "remove_spaces" -> TextCleaner.removeSpaces(currentContent)
            "fullwidth_to_halfwidth" -> TextCleaner.fullwidthToHalfwidth(currentContent)
            "halfwidth_to_fullwidth" -> TextCleaner.halfwidthToFullwidth(currentContent)
            "punc_to_english" -> TextCleaner.puncToEnglish(currentContent)
            "punc_to_chinese" -> TextCleaner.puncToChinese(currentContent)
            "to_upper_case" -> TextCleaner.toUpperCase(currentContent)
            "to_lower_case" -> TextCleaner.toLowerCase(currentContent)
            "title_case" -> TextCleaner.toTitleCase(currentContent)
            "simplified_to_traditional" -> TextCleaner.simplifiedToTraditional(currentContent)
            "traditional_to_simplified" -> TextCleaner.traditionalToSimplified(currentContent)
            else -> currentContent
        }
        _content.value = newContent
        _message.value = "文本处理完成"
    }

    private fun addBulletList(content: String): String {
        val lines = content.lines()
        val bulletLines = lines.map { "• $it" }
        return bulletLines.joinToString("\n")
    }

    private fun addNumberList(content: String): String {
        val lines = content.lines()
        val numberedLines = lines.mapIndexed { index, line -> "${index + 1}. $line" }
        return numberedLines.joinToString("\n")
    }

    fun exportToTxt(context: Context) {
        scope.launch(Dispatchers.IO) {
            val doc = _currentDocument.value ?: return@launch
            val content = doc.content
            
            try {
                // 使用 MediaStore API 保存文件
                val values = android.content.ContentValues().apply {
                    put(MediaStore.MediaColumns.DISPLAY_NAME, "${doc.title}.txt")
                    put(MediaStore.MediaColumns.MIME_TYPE, "text/plain")
                    put(MediaStore.MediaColumns.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS)
                }
                
                val resolver = context.contentResolver
                val uri = resolver.insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, values)
                
                if (uri != null) {
                    resolver.openOutputStream(uri)?.use {outputStream ->
                        outputStream.write(content.toByteArray())
                    }
                    _message.value = "导出成功，文件已保存到下载文件夹"
                } else {
                    _message.value = "导出失败"
                }
            } catch (e: Exception) {
                _message.value = "导出失败: ${e.message}"
            }
        }
    }

    fun findReplace(find: String, replace: String, replaceAll: Boolean = true) {
        val currentContent = _content.value
        val newContent = if (replaceAll) {
            currentContent.replace(find, replace)
        } else {
            currentContent.replaceFirst(find, replace)
        }
        _content.value = newContent
        _message.value = "替换完成"
    }
}

package com.youreln.cloudpad.ui

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material.icons.filled.Download
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.FormatBold
import androidx.compose.material.icons.filled.FormatItalic
import androidx.compose.material.icons.filled.FormatUnderlined
import androidx.compose.material.icons.filled.FormatStrikethrough
import androidx.compose.material.icons.filled.FormatListBulleted
import androidx.compose.material.icons.filled.FormatListNumbered
import androidx.compose.material.icons.filled.DeleteSweep
import androidx.compose.material.icons.filled.CleaningServices
import androidx.compose.material.icons.filled.SwapHoriz
import androidx.compose.material.icons.filled.Translate
import androidx.compose.material.icons.filled.TextFields
import androidx.compose.material.icons.filled.Language
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.input.KeyboardCapitalization
import androidx.compose.ui.unit.dp
import androidx.compose.ui.input.pointer.PointerIconDefaults
import androidx.compose.ui.input.pointer.pointerHoverIcon
import androidx.compose.ui.semantics.Role
import androidx.compose.foundation.clickable
import com.youreln.cloudpad.data.Document
import com.youreln.cloudpad.viewmodel.EditorViewModel
import kotlinx.coroutines.flow.collectLatest

@Composable
fun EditorScreen() {
    val context = LocalContext.current
    val viewModel = remember { EditorViewModel(context) }
    val documents by viewModel.documents.collectAsState(emptyList())
    val currentDocument by viewModel.currentDocument.collectAsState()
    val content by viewModel.content.collectAsState()
    val showDocumentList by viewModel.showDocumentList.collectAsState()
    val showRenameDialog by viewModel.showRenameDialog.collectAsState()
    val showDeleteDialog by viewModel.showDeleteDialog.collectAsState()
    val renameText by viewModel.renameText.collectAsState()
    val snackbarHostState = remember { SnackbarHostState() }

    // 监听消息
    LaunchedEffect(viewModel)
    {
        viewModel.message.collectLatest {
            if (it.isNotEmpty()) {
                snackbarHostState.showSnackbar(it)
            }
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    if (currentDocument != null) {
                        Text(currentDocument!!.title)
                    } else {
                        Text("云笺 Cloudpad")
                    }
                },
                navigationIcon = {
                    IconButton(onClick = { viewModel.toggleDocumentList() }) {
                        Icon(Icons.Filled.Menu, contentDescription = "菜单")
                    }
                },
                actions = {
                    IconButton(onClick = { viewModel.exportToTxt(context) }) {
                        Icon(Icons.Filled.Download, contentDescription = "导出")
                    }
                    IconButton(onClick = { viewModel.showRenameDialog() }) {
                        Icon(Icons.Filled.Edit, contentDescription = "重命名")
                    }
                    IconButton(onClick = { viewModel.showDeleteDialog() }) {
                        Icon(Icons.Filled.Delete, contentDescription = "删除")
                    }
                }
            )
        },
        floatingActionButton = {
            FloatingActionButton(onClick = { viewModel.createNewDocument() }) {
                Icon(Icons.Filled.Add, contentDescription = "新建")
            }
        },
        snackbarHost = {
            SnackbarHost(hostState = snackbarHostState)
        }
    ) {innerPadding ->
        Box(modifier = Modifier.padding(innerPadding)) {
            if (showDocumentList) {
                DocumentListScreen(
                    documents = documents,
                    onDocumentSelect = { viewModel.selectDocument(it) },
                    onNewDocument = { viewModel.createNewDocument() }
                )
            } else {
                EditorContentScreen(
                    content = content,
                    onContentChange = { viewModel.updateContent(it) },
                    viewModel = viewModel
                )
            }
        }
    }

    // 重命名对话框
    if (showRenameDialog && currentDocument != null) {
        AlertDialog(
            onDismissRequest = { viewModel.hideRenameDialog() },
            title = { Text("重命名文档") },
            text = {
                TextField(
                    value = renameText,
                    onValueChange = { viewModel.updateRenameText(it) },
                    label = { Text("文档名称") },
                    singleLine = true
                )
            },
            confirmButton = {
                Button(onClick = { viewModel.renameDocument() }) {
                    Text("保存")
                }
            },
            dismissButton = {
                Button(onClick = { viewModel.hideRenameDialog() }) {
                    Text("取消")
                }
            }
        )
    }

    // 删除对话框
    if (showDeleteDialog && currentDocument != null) {
        AlertDialog(
            onDismissRequest = { viewModel.hideDeleteDialog() },
            title = { Text("删除文档") },
            text = {
                Text("确定要删除这个文档吗？")
            },
            confirmButton = {
                Button(onClick = { viewModel.deleteDocument() }) {
                    Text("删除")
                }
            },
            dismissButton = {
                Button(onClick = { viewModel.hideDeleteDialog() }) {
                    Text("取消")
                }
            }
        )
    }
}

@Composable
fun DocumentListScreen(
    documents: List<Document>,
    onDocumentSelect: (Document) -> Unit,
    onNewDocument: () -> Unit
) {
    Column(
        modifier = Modifier.fillMaxSize()
    ) {
        TopAppBar(
            title = {
                Text("文档列表")
            }
        )
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(16.dp)
        ) {
            items(documents) {
                document ->
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(8.dp)
                        .clickable {
                            onDocumentSelect(document)
                        }
                ) {
                    Column(
                        modifier = Modifier.padding(16.dp)
                    ) {
                        Text(
                            document.title,
                            style = MaterialTheme.typography.titleMedium
                        )
                        Text(
                            document.updatedAt.toString(),
                            style = MaterialTheme.typography.bodySmall,
                            modifier = Modifier.padding(top = 4.dp)
                        )
                    }
                }
            }
        }
    }
}

@Composable
fun EditorContentScreen(
    content: String,
    onContentChange: (String) -> Unit,
    viewModel: EditorViewModel
) {
    Column(
        modifier = Modifier.fillMaxSize()
    ) {
        // 工具栏
        Toolbar(viewModel)
        
        // 编辑区域
        TextField(
            value = content,
            onValueChange = onContentChange,
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            placeholder = {
                Text("开始编辑...")
            },
            keyboardOptions = KeyboardOptions(
                capitalization = KeyboardCapitalization.Sentences
            ),
            maxLines = Int.MAX_VALUE
        )
        
        // 统计信息
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            contentAlignment = Alignment.CenterEnd
        ) {
            Text(
                "${content.length} 字符",
                style = MaterialTheme.typography.bodySmall
            )
        }
    }
}

@Composable
fun Toolbar(viewModel: EditorViewModel) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .background(MaterialTheme.colorScheme.surfaceVariant)
            .padding(8.dp)
    ) {
        // 第一行：基础格式
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            IconButton(onClick = { viewModel.formatText("bold") }) {
                Icon(Icons.Filled.FormatBold, contentDescription = "加粗")
            }
            IconButton(onClick = { viewModel.formatText("italic") }) {
                Icon(Icons.Filled.FormatItalic, contentDescription = "斜体")
            }
            IconButton(onClick = { viewModel.formatText("underline") }) {
                Icon(Icons.Filled.FormatUnderlined, contentDescription = "下划线")
            }
            IconButton(onClick = { viewModel.formatText("strikethrough") }) {
                Icon(Icons.Filled.FormatStrikethrough, contentDescription = "删除线")
            }
            IconButton(onClick = { viewModel.formatText("bullet_list") }) {
                Icon(Icons.Filled.FormatListBulleted, contentDescription = "项目符号")
            }
            IconButton(onClick = { viewModel.formatText("number_list") }) {
                Icon(Icons.Filled.FormatListNumbered, contentDescription = "编号列表")
            }
        }
        
        // 第二行：文本清洗
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            IconButton(onClick = { viewModel.cleanText("remove_empty_lines") }) {
                Icon(Icons.Filled.DeleteSweep, contentDescription = "去空行")
            }
            IconButton(onClick = { viewModel.cleanText("remove_spaces") }) {
                Icon(Icons.Filled.CleaningServices, contentDescription = "去空格")
            }
            IconButton(onClick = { viewModel.cleanText("fullwidth_to_halfwidth") }) {
                Icon(Icons.Filled.SwapHoriz, contentDescription = "全半角")
            }
            IconButton(onClick = { viewModel.cleanText("punc_to_english") }) {
                Icon(Icons.Filled.Translate, contentDescription = "标点转换")
            }
            IconButton(onClick = { viewModel.cleanText("to_upper_case") }) {
                Icon(Icons.Filled.TextFields, contentDescription = "大小写")
            }
            IconButton(onClick = { viewModel.cleanText("simplified_to_traditional") }) {
                Icon(Icons.Filled.Language, contentDescription = "繁简转换")
            }
        }
    }
}

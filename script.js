// DOM 元素获取
const elements = {
    editor: document.getElementById('editor'),
    themeToggle: document.getElementById('theme-toggle'),
    aboutBtn: document.getElementById('about-btn'),
    shareBtn: document.getElementById('share-btn'),
    mobileToolbar: document.getElementById('mobile-toolbar'),
    removeEmptyLines: document.getElementById('remove-empty-lines'),
    removeSpaces: document.getElementById('remove-spaces'),
    fullwidthHalfwidth: document.getElementById('fullwidth-halfwidth'),
    punctuationSwap: document.getElementById('punctuation-swap'),
    caseConvert: document.getElementById('case-convert'),
    traditionalSimplified: document.getElementById('traditional-simplified'),
    findReplace: document.getElementById('find-replace'),
    copyRichText: document.getElementById('copy-rich-text'),
    copyPlainText: document.getElementById('copy-plain-text'),
    exportTxt: document.getElementById('export-txt'),
    clearContent: document.getElementById('clear-content'),
    saveStatus: document.getElementById('save-status'),
    wordCount: document.getElementById('word-count'),
    charCount: document.getElementById('char-count'),
    lineCount: document.getElementById('line-count'),
    toast: document.getElementById('toast'),
    findReplaceModal: document.getElementById('find-replace-modal'),
    closeModal: document.getElementById('close-modal'),
    findText: document.getElementById('find-text'),
    replaceText: document.getElementById('replace-text'),
    replaceAll: document.getElementById('replace-all'),
    findNext: document.getElementById('find-next'),
    replaceBtn: document.getElementById('replace-btn'),
    replaceAllBtn: document.getElementById('replace-all-btn'),
    caseModal: document.getElementById('case-modal'),
    toUppercase: document.getElementById('to-uppercase'),
    toLowercase: document.getElementById('to-lowercase'),
    toTitlecase: document.getElementById('to-titlecase'),
    backToTop: document.getElementById('back-to-top'),
    editorResizer: document.querySelector('.editor-resizer')
};

// 全局变量
let isDragging = false;
let lastSelection = null;
let isDarkMode = false;

// 简繁转换映射表（部分常用字）
const traditionalSimplifiedMap = {
    '繁': '繁', '简': '简', '体': '体', '语': '语', '言': '言', '文': '文', '字': '字',
    '电': '电', '脑': '脑', '软': '软', '件': '件', '硬': '硬', '盘': '盘', '键': '键',
    '鼠': '鼠', '标': '标', '屏': '屏', '幕': '幕', '网': '网', '络': '络', '互': '互',
    '联': '联', '网': '网', '站': '站', '页': '页', '面': '面', '程': '程', '序': '序',
    '设': '设', '计': '计', '开': '开', '发': '发', '测': '测', '试': '试', '维': '维',
    '护': '护', '管': '管', '理': '理', '系': '系', '统': '统', '数': '数', '据': '据',
    '库': '库', '表': '表', '格': '格', '图': '图', '像': '像', '音': '音', '频': '频',
    '视': '视', '频': '频', '文': '文', '件': '件', '夹': '夹', '资': '资', '源': '源',
    '下': '下', '载': '载', '上': '上', '传': '传', '安': '安', '装': '装', '卸': '卸',
    '载': '载', '更': '更', '新': '新', '升': '升', '级': '级', '版': '版', '本': '本',
    '密': '密', '码': '码', '账': '账', '号': '号', '用': '用', '户': '户', '权': '权',
    '限': '限', '设': '设', '置': '置', '配': '配', '置': '置', '环': '环', '境': '境',
    '变': '变', '量': '量', '参': '参', '数': '数', '函': '函', '数': '数', '方': '方',
    '法': '法', '类': '类', '型': '型', '对': '对', '象': '象', '属': '属', '性': '性',
    '事': '事', '件': '件', '模': '模', '块': '块', '组': '组', '件': '件', '页': '页',
    '面': '面', '布': '布', '局': '局', '样': '样', '式': '式', '样': '样', '式': '式',
    '表': '表', '单': '单', '按': '按', '钮': '钮', '输': '输', '入': '入', '框': '框',
    '列': '列', '表': '表', '菜': '菜', '单': '单', '导': '导', '航': '航', '栏': '栏',
    '标': '标', '题': '题', '内': '内', '容': '容', '描': '描', '述': '述', '关': '关',
    '键': '键', '词': '词', '标': '标', '签': '签', '分': '分', '类': '类', '归': '归',
    '类': '类', '搜': '搜', '索': '索', '结': '结', '果': '果', '排': '排', '序': '序',
    '筛': '筛', '选': '选', '过': '过', '滤': '滤', '分': '分', '页': '页', '跳': '跳',
    '转': '转', '链': '链', '接': '接', '超': '超', '链': '链', '接': '接', '图': '图',
    '片': '片', '插': '插', '入': '入', '删': '删', '除': '除', '修': '修', '改': '改',
    '复': '复', '制': '制', '剪': '剪', '切': '切', '粘': '粘', '贴': '贴', '移': '移',
    '动': '动', '复': '复', '制': '制', '删': '删', '除': '除', '保': '保', '存': '存',
    '发': '发', '布': '布', '预': '预', '览': '览', '撤': '撤', '销': '销', '删': '删',
    '除': '除', '恢': '恢', '复': '复', '备': '备', '份': '份', '还': '还', '原': '原',
    '导': '导', '入': '入', '导': '导', '出': '出', '汇': '汇', '出': '出', '打': '打',
    '印': '印', '导': '导', '出': '出', '导': '导', '入': '入', '导': '导', '出': '出'
};

// 初始化
function init() {
    loadFromLocalStorage();
    loadTheme();
    bindEvents();
    updateStats();
    startAutoSave();
}

// 绑定事件
function bindEvents() {
    // 富文本编辑按钮
    document.querySelectorAll('.toolbar-btn[data-command]').forEach(btn => {
        btn.addEventListener('click', handleRichTextCommand);
    });

    // 文本清洗按钮
    elements.removeEmptyLines.addEventListener('click', removeEmptyLines);
    elements.removeSpaces.addEventListener('click', removeExtraSpaces);
    elements.fullwidthHalfwidth.addEventListener('click', toggleFullwidthHalfwidth);
    elements.punctuationSwap.addEventListener('click', swapPunctuation);
    elements.caseConvert.addEventListener('click', showCaseModal);
    elements.traditionalSimplified.addEventListener('click', toggleTraditionalSimplified);
    elements.findReplace.addEventListener('click', showFindReplaceModal);

    // 操作按钮
    elements.copyRichText.addEventListener('click', copyRichText);
    elements.copyPlainText.addEventListener('click', copyPlainText);
    elements.exportTxt.addEventListener('click', exportTxt);
    elements.clearContent.addEventListener('click', clearContent);

    // 编辑器事件
    elements.editor.addEventListener('input', updateStats);
    elements.editor.addEventListener('keydown', handleEditorKeydown);

    // 主题切换
    elements.themeToggle.addEventListener('click', toggleTheme);

    // 分享按钮
    elements.shareBtn.addEventListener('click', shareContent);

    // 关于按钮
    elements.aboutBtn.addEventListener('click', showAbout);

    // 手机端工具栏
    elements.mobileToolbar.addEventListener('change', handleMobileToolbar);

    // 查找替换弹窗
    elements.closeModal.addEventListener('click', hideFindReplaceModal);
    elements.findNext.addEventListener('click', findNext);
    elements.replaceBtn.addEventListener('click', replace);
    elements.replaceAllBtn.addEventListener('click', replaceAll);

    // 大小写转换弹窗
    document.querySelectorAll('#case-modal .modal-close').forEach(btn => {
        btn.addEventListener('click', hideCaseModal);
    });
    elements.toUppercase.addEventListener('click', () => convertCase('uppercase'));
    elements.toLowercase.addEventListener('click', () => convertCase('lowercase'));
    elements.toTitlecase.addEventListener('click', () => convertCase('titlecase'));

    // 拖拽调整高度
    elements.editorResizer.addEventListener('mousedown', startResize);
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);

    // 一键回到顶部
    elements.backToTop.addEventListener('click', backToTop);
    window.addEventListener('scroll', toggleBackToTop);

    // 点击弹窗外部关闭
    elements.findReplaceModal.addEventListener('click', (e) => {
        if (e.target === elements.findReplaceModal) {
            hideFindReplaceModal();
        }
    });

    elements.caseModal.addEventListener('click', (e) => {
        if (e.target === elements.caseModal) {
            hideCaseModal();
        }
    });
}

// 富文本编辑命令处理
function handleRichTextCommand(e) {
    const btn = e.target.closest('.toolbar-btn');
    const command = btn.dataset.command;
    const value = btn.dataset.value;

    if (command === 'foreColor' || command === 'hiliteColor') {
        const color = prompt('请输入颜色值 (例如: #ff0000 或 red):');
        if (color) {
            document.execCommand(command, false, color);
        }
    } else {
        document.execCommand(command, false, value);
    }

    elements.editor.focus();
}

// 文本清洗 - 去空行
function removeEmptyLines() {
    const text = elements.editor.textContent;
    const cleanedText = text.replace(/\n{3,}/g, '\n\n').trim();
    elements.editor.textContent = cleanedText;
    showToast('已去除空行');
    updateStats();
}

// 文本清洗 - 去多余空格
function removeExtraSpaces() {
    const text = elements.editor.textContent;
    const cleanedText = text.replace(/\s+/g, ' ').trim();
    elements.editor.textContent = cleanedText;
    showToast('已去除多余空格');
    updateStats();
}

// 文本清洗 - 全角半角互换
function toggleFullwidthHalfwidth() {
    let text = elements.editor.textContent;
    let result = '';

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const code = char.charCodeAt(0);

        // 半角转全角
        if (code >= 33 && code <= 126) {
            result += String.fromCharCode(code + 65248);
        } 
        // 全角转半角
        else if (code >= 65281 && code <= 65374) {
            result += String.fromCharCode(code - 65248);
        } 
        // 其他字符不变
        else {
            result += char;
        }
    }

    elements.editor.textContent = result;
    showToast('已转换全角半角');
    updateStats();
}

// 文本清洗 - 中英文标点互换
function swapPunctuation() {
    const punctuationMap = {
        '。': '.', '.': '。',
        '，': ',', ',': '，',
        '！': '!', '!': '！',
        '？': '?', '?': '？',
        '；': ';', ';': '；',
        '：': ':', ':': '：',
        '“': '"', '"': '“',
        '”': '"',
        '‘': "'", "'": '‘',
        '’': "'",
        '（': '(', '(': '（',
        '）': ')', ')': '）',
        '【': '[', '[': '【',
        '】': ']', ']': '】',
        '《': '<', '<': '《',
        '》': '>', '>': '》',
        '、': ',',
        '～': '~', '~': '～'
    };

    let text = elements.editor.textContent;
    let result = '';

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        result += punctuationMap[char] || char;
    }

    elements.editor.textContent = result;
    showToast('已互换中英文标点');
    updateStats();
}

// 显示大小写转换弹窗
function showCaseModal() {
    elements.caseModal.classList.add('show');
}

// 隐藏大小写转换弹窗
function hideCaseModal() {
    elements.caseModal.classList.remove('show');
}

// 大小写转换
function convertCase(type) {
    let text = elements.editor.textContent;
    let result = '';

    switch (type) {
        case 'uppercase':
            result = text.toUpperCase();
            break;
        case 'lowercase':
            result = text.toLowerCase();
            break;
        case 'titlecase':
            result = text.replace(/\b\w/g, char => char.toUpperCase());
            break;
    }

    elements.editor.textContent = result;
    showToast('已转换大小写');
    hideCaseModal();
    updateStats();
}

// 简繁转换
function toggleTraditionalSimplified() {
    let text = elements.editor.textContent;
    let result = '';

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        // 简单实现，实际项目中可以使用更完整的映射表
        result += traditionalSimplifiedMap[char] || char;
    }

    elements.editor.textContent = result;
    showToast('已转换繁简体');
    updateStats();
}

// 显示查找替换弹窗
function showFindReplaceModal() {
    elements.findReplaceModal.classList.add('show');
    elements.findText.focus();
}

// 隐藏查找替换弹窗
function hideFindReplaceModal() {
    elements.findReplaceModal.classList.remove('show');
}

// 查找下一个
function findNext() {
    const text = elements.editor.textContent;
    const find = elements.findText.value;

    if (!find) return;

    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const startPos = range.endOffset;
    const nextPos = text.indexOf(find, startPos);

    if (nextPos !== -1) {
        const newRange = document.createRange();
        const textNode = elements.editor.firstChild;
        newRange.setStart(textNode, nextPos);
        newRange.setEnd(textNode, nextPos + find.length);
        selection.removeAllRanges();
        selection.addRange(newRange);
        elements.editor.focus();
    } else {
        showToast('已到达文本末尾');
    }
}

// 替换
function replace() {
    const find = elements.findText.value;
    const replace = elements.replaceText.value;

    if (!find) return;

    const selection = window.getSelection();
    if (selection.toString() === find) {
        document.execCommand('insertText', false, replace);
        findNext();
        showToast('已替换一处');
    } else {
        findNext();
    }
}

// 全部替换
function replaceAll() {
    const find = elements.findText.value;
    const replace = elements.replaceText.value;

    if (!find) return;

    let text = elements.editor.textContent;
    const regex = new RegExp(find, 'g');
    const result = text.replace(regex, replace);

    elements.editor.textContent = result;
    showToast('已全部替换');
    hideFindReplaceModal();
    updateStats();
}

// 复制富文本
function copyRichText() {
    const html = elements.editor.innerHTML;
    const temp = document.createElement('div');
    temp.innerHTML = html;
    temp.contentEditable = true;
    temp.style.position = 'absolute';
    temp.style.left = '-9999px';
    document.body.appendChild(temp);
    temp.focus();
    document.execCommand('selectAll');
    document.execCommand('copy');
    document.body.removeChild(temp);
    showToast('已复制富文本');
}

// 复制纯文本
function copyPlainText() {
    const text = elements.editor.textContent;
    navigator.clipboard.writeText(text).then(() => {
        showToast('已复制纯文本');
    });
}

// 导出 TXT
function exportTxt() {
    const text = elements.editor.textContent;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '云笺导出_' + new Date().toISOString().slice(0, 10) + '.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('已导出 TXT 文件');
}

// 清空内容
function clearContent() {
    if (confirm('确定要清空所有内容吗？')) {
        elements.editor.innerHTML = '';
        showToast('已清空内容');
        updateStats();
    }
}

// 手机端工具栏处理
function handleMobileToolbar() {
    const value = elements.mobileToolbar.value;
    if (!value) return;

    switch (value) {
        case 'bold':
        case 'italic':
        case 'underline':
        case 'strikeThrough':
        case 'insertOrderedList':
        case 'insertUnorderedList':
        case 'justifyLeft':
        case 'justifyCenter':
        case 'justifyRight':
        case 'removeFormat':
            document.execCommand(value, false, null);
            break;
        case 'h1':
        case 'h2':
        case 'h3':
            document.execCommand('formatBlock', false, `<${value}>`);
            break;
        case 'remove-empty-lines':
            removeEmptyLines();
            break;
        case 'remove-spaces':
            removeExtraSpaces();
            break;
        case 'fullwidth-halfwidth':
            toggleFullwidthHalfwidth();
            break;
        case 'punctuation-swap':
            swapPunctuation();
            break;
        case 'case-convert':
            showCaseModal();
            break;
        case 'traditional-simplified':
            toggleTraditionalSimplified();
            break;
        case 'find-replace':
            showFindReplaceModal();
            break;
        case 'copy-rich-text':
            copyRichText();
            break;
        case 'copy-plain-text':
            copyPlainText();
            break;
        case 'export-txt':
            exportTxt();
            break;
        case 'clear-content':
            clearContent();
            break;
    }

    elements.mobileToolbar.value = '';
    elements.editor.focus();
}

// 编辑器键盘事件处理
function handleEditorKeydown(e) {
    // 阻止默认的 Tab 行为，实现缩进
    if (e.key === 'Tab') {
        e.preventDefault();
        document.execCommand('insertText', false, '    ');
    }
}

// 主题切换
function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    elements.themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('darkMode', isDarkMode);
    showToast(isDarkMode ? '已切换到暗黑模式' : '已切换到浅色模式');
}

// 加载主题
function loadTheme() {
    isDarkMode = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark-mode', isDarkMode);
    elements.themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// 显示关于
function showAbout() {
    alert('云笺 - 极简富文本工具箱\n\n版本: 1.0.0\n\n一个纯前端响应式富文本处理工具，支持手机/平板/电脑全端适配。\n\n功能特点：\n- 富文本编辑\n- 文本清洗\n- 导出操作\n- 暗黑模式\n- 自动保存\n\n开源免费，纯本地运行。');
}

// 实时统计
function updateStats() {
    const text = elements.editor.textContent;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const lines = text.split('\n').length;

    elements.wordCount.textContent = `字数: ${words}`;
    elements.charCount.textContent = `字符: ${chars}`;
    elements.lineCount.textContent = `行数: ${lines}`;
}

// 自动保存
function startAutoSave() {
    setInterval(() => {
        saveToLocalStorage();
        elements.saveStatus.textContent = '已自动保存';
        setTimeout(() => {
            elements.saveStatus.textContent = '自动保存中...';
        }, 1000);
    }, 3000);
}

// 保存到本地存储
function saveToLocalStorage() {
    const content = elements.editor.innerHTML;
    localStorage.setItem('editorContent', content);
}

// 从本地存储加载
function loadFromLocalStorage() {
    const content = localStorage.getItem('editorContent');
    if (content) {
        elements.editor.innerHTML = content;
        updateStats();
    }
}

// 显示操作提示
function showToast(message) {
    elements.toast.textContent = message;
    elements.toast.classList.add('show');
    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 2000);
}

// 拖拽调整高度
function startResize(e) {
    isDragging = true;
    document.body.style.cursor = 'ns-resize';
}

function resize(e) {
    if (!isDragging) return;
    const editorRect = elements.editor.getBoundingClientRect();
    const newHeight = e.clientY - editorRect.top;
    if (newHeight > 200) {
        elements.editor.style.minHeight = `${newHeight}px`;
    }
}

function stopResize() {
    isDragging = false;
    document.body.style.cursor = '';
}

// 分享功能
function shareContent() {
    const shareText = '云笺 - 轻量美观的开源富文本编辑与文本处理工具';
    const shareUrl = 'https://github.com/Youreln/Cloudpad';
    const shareTitle = '云笺 (Cloudpad)';

    // 检查是否支持 Web Share API
    if (navigator.share) {
        navigator.share({
            title: shareTitle,
            text: shareText,
            url: shareUrl
        })
        .then(() => {
            showToast('分享成功');
        })
        .catch((error) => {
            // 如果用户取消分享或其他错误，使用备选方案
            copyShareLink(shareUrl, shareText);
        });
    } else {
        // 不支持 Web Share API 的浏览器，使用复制链接的方式
        copyShareLink(shareUrl, shareText);
    }
}

// 复制分享链接
function copyShareLink(url, text) {
    const shareContent = `${text}\n${url}`;
    navigator.clipboard.writeText(shareContent)
    .then(() => {
        showToast('链接已复制到剪贴板，可直接分享');
    })
    .catch(() => {
        // 剪贴板 API 失败，使用传统方法
        const textArea = document.createElement('textarea');
        textArea.value = shareContent;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showToast('链接已复制到剪贴板，可直接分享');
        } catch (error) {
            showToast('复制失败，请手动复制链接');
        } finally {
            document.body.removeChild(textArea);
        }
    });
}

// 一键回到顶部
function backToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 切换回到顶部按钮显示
function toggleBackToTop() {
    if (window.scrollY > 300) {
        elements.backToTop.classList.add('show');
    } else {
        elements.backToTop.classList.remove('show');
    }
}

// 初始化应用
init();
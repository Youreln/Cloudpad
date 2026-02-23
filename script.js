// DOM 元素获取
const elements = {
    editor: document.getElementById('editor'),
    themeToggle: document.getElementById('theme-toggle'),
    aboutBtn: document.getElementById('about-btn'),
    shareBtn: document.getElementById('share-btn'),
    cloudBackup: document.getElementById('cloud-backup'),
    userBtn: document.getElementById('user-btn'),
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
    editorResizer: document.querySelector('.editor-resizer'),
    // 分享相关元素
    shareModal: document.getElementById('share-modal'),
    shareModalClose: document.querySelector('.share-modal-close'),
    shareLink: document.getElementById('share-link'),
    shareImage: document.getElementById('share-image'),
    shareSystem: document.getElementById('share-system'),
    imageOptions: document.getElementById('image-options'),
    styleBtns: document.querySelectorAll('.style-btn'),
    generateImage: document.getElementById('generate-image'),
    downloadImage: document.getElementById('download-image'),
    shareCanvas: document.getElementById('share-canvas'),
    // 用户相关元素
    userModal: document.getElementById('user-modal'),
    userModalClose: document.querySelector('.user-modal-close'),
    userModalTitle: document.getElementById('user-modal-title'),
    loginForm: document.getElementById('login-form'),
    registerForm: document.getElementById('register-form'),
    loginUsername: document.getElementById('login-username'),
    loginPassword: document.getElementById('login-password'),
    loginBtn: document.getElementById('login-btn'),
    switchToRegister: document.getElementById('switch-to-register'),
    registerUsername: document.getElementById('register-username'),
    registerPassword: document.getElementById('register-password'),
    registerConfirmPassword: document.getElementById('register-confirm-password'),
    registerBtn: document.getElementById('register-btn'),
    switchToLogin: document.getElementById('switch-to-login'),
    // 云备份相关元素
    cloudModal: document.getElementById('cloud-modal'),
    cloudModalClose: document.querySelector('.cloud-modal-close'),
    webdavUrl: document.getElementById('webdav-url'),
    webdavUsername: document.getElementById('webdav-username'),
    webdavPassword: document.getElementById('webdav-password'),
    autoBackup: document.getElementById('auto-backup'),
    showFiles: document.getElementById('show-files'),
    localSave: document.getElementById('local-save'),
    cloudSave: document.getElementById('cloud-save'),
    saveWebdav: document.getElementById('save-webdav'),
    testConnection: document.getElementById('test-connection'),
    manualBackup: document.getElementById('manual-backup'),
    backupFiles: document.getElementById('backup-files'),
    filesList: document.getElementById('files-list')
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
    elements.shareBtn.addEventListener('click', showShareModal);

    // 分享弹窗事件
    elements.shareModalClose.addEventListener('click', hideShareModal);
    elements.shareLink.addEventListener('click', copyShareLink);
    elements.shareImage.addEventListener('click', showImageOptions);
    elements.shareSystem.addEventListener('click', systemShare);
    
    // 图片样式选择
    elements.styleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            elements.styleBtns.forEach(b => b.classList.remove('active'));
            e.target.closest('.style-btn').classList.add('active');
        });
    });
    
    // 图片生成和下载
    elements.generateImage.addEventListener('click', generateShareImage);
    elements.downloadImage.addEventListener('click', downloadShareImage);
    
    // 点击弹窗外部关闭
    elements.shareModal.addEventListener('click', (e) => {
        if (e.target === elements.shareModal) {
            hideShareModal();
        }
    });

    // 用户按钮和弹窗
    elements.userBtn.addEventListener('click', showUserModal);
    elements.userModalClose.addEventListener('click', hideUserModal);
    elements.switchToRegister.addEventListener('click', switchToRegisterForm);
    elements.switchToLogin.addEventListener('click', switchToLoginForm);
    elements.loginBtn.addEventListener('click', login);
    elements.registerBtn.addEventListener('click', register);
    
    // 点击弹窗外部关闭
    elements.userModal.addEventListener('click', (e) => {
        if (e.target === elements.userModal) {
            hideUserModal();
        }
    });

    // 云备份按钮和弹窗
    elements.cloudBackup.addEventListener('click', showCloudModal);
    elements.cloudModalClose.addEventListener('click', hideCloudModal);
    elements.saveWebdav.addEventListener('click', saveWebdavConfig);
    elements.testConnection.addEventListener('click', testWebdavConnection);
    elements.manualBackup.addEventListener('click', manualBackup);
    elements.showFiles.addEventListener('change', toggleFilesList);
    
    // 点击弹窗外部关闭
    elements.cloudModal.addEventListener('click', (e) => {
        if (e.target === elements.cloudModal) {
            hideCloudModal();
        }
    });

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
        const config = JSON.parse(localStorage.getItem('webdavConfig') || '{}');
        
        // 本地保存
        if (config.localSave) {
            saveToLocalStorage();
            elements.saveStatus.textContent = '已本地保存';
        }
        
        // 云端保存
        if (config.cloudSave && config.autoBackup && config.url && config.username && config.password) {
            // 验证 URL 格式
            if (config.url.startsWith('http://') || config.url.startsWith('https://')) {
                autoBackup();
            } else {
                console.warn('WebDAV URL 格式不正确，跳过自动备份');
            }
        }
        
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

// 显示分享弹窗
function showShareModal() {
    elements.shareModal.classList.add('show');
    // 隐藏图片选项
    elements.imageOptions.classList.remove('show');
}

// 隐藏分享弹窗
function hideShareModal() {
    elements.shareModal.classList.remove('show');
    elements.imageOptions.classList.remove('show');
}

// 显示图片样式选项
function showImageOptions() {
    elements.imageOptions.classList.add('show');
    // 生成默认预览
    generateShareImage();
}

// 系统分享
function systemShare() {
    const shareText = '云笺 - 轻量美观的开源富文本编辑与文本处理工具';
    const shareUrl = 'https://github.com/Youreln/Cloudpad';
    const shareTitle = '云笺 (Cloudpad)';

    if (navigator.share) {
        navigator.share({
            title: shareTitle,
            text: shareText,
            url: shareUrl
        })
        .then(() => {
            showToast('分享成功');
            hideShareModal();
        })
        .catch((error) => {
            // 如果用户取消分享或其他错误，使用备选方案
            copyShareLink();
            hideShareModal();
        });
    } else {
        // 不支持 Web Share API 的浏览器，使用复制链接的方式
        copyShareLink();
        hideShareModal();
    }
}

// 复制分享链接
function copyShareLink() {
    const shareText = '云笺 - 轻量美观的开源富文本编辑与文本处理工具';
    const shareUrl = 'https://github.com/Youreln/Cloudpad';
    const shareContent = `${shareText}\n${shareUrl}`;
    
    navigator.clipboard.writeText(shareContent)
    .then(() => {
        showToast('链接已复制到剪贴板，可直接分享');
        hideShareModal();
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
            hideShareModal();
        } catch (error) {
            showToast('复制失败，请手动复制链接');
        } finally {
            document.body.removeChild(textArea);
        }
    });
}

// 生成分享图片
function generateShareImage() {
    const canvas = elements.shareCanvas;
    const ctx = canvas.getContext('2d');
    
    // 获取选中的样式
    const activeStyle = document.querySelector('.style-btn.active').dataset.style;
    
    // 设置画布大小
    canvas.width = 800;
    canvas.height = 600;
    
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 根据样式生成图片
    switch (activeStyle) {
        case 'classic':
            drawClassicStyle(ctx, canvas);
            break;
        case 'modern':
            drawModernStyle(ctx, canvas);
            break;
        case 'minimal':
            drawMinimalStyle(ctx, canvas);
            break;
    }
    
    showToast('图片生成成功');
}

// 经典样式
function drawClassicStyle(ctx, canvas) {
    // 背景
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#f8fafc');
    gradient.addColorStop(1, '#e2e8f0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 边框
    ctx.strokeStyle = '#165DFF';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    
    // Logo
    ctx.font = '48px Font Awesome 6 Free';
    ctx.fillStyle = '#165DFF';
    ctx.textAlign = 'center';
    ctx.fillText('\uf0c2', canvas.width / 2, 120);
    
    // 标题
    ctx.font = '28px system-ui, -apple-system, Segoe UI, sans-serif';
    ctx.fillStyle = '#1e293b';
    ctx.textAlign = 'center';
    ctx.fillText('云笺 (Cloudpad)', canvas.width / 2, 180);
    
    // 描述
    ctx.font = '18px system-ui, -apple-system, Segoe UI, sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'center';
    ctx.fillText('轻量美观的开源富文本编辑与文本处理工具', canvas.width / 2, 220);
    
    // 功能列表
    const features = [
        '• 富文本编辑',
        '• 文本清洗',
        '• 格式转换',
        '• 一键导出',
        '• 暗黑模式',
        '• 响应式布局'
    ];
    
    ctx.font = '16px system-ui, -apple-system, Segoe UI, sans-serif';
    ctx.fillStyle = '#475569';
    ctx.textAlign = 'center';
    
    features.forEach((feature, index) => {
        ctx.fillText(feature, canvas.width / 2, 280 + index * 30);
    });
    
    // 底部信息
    ctx.font = '14px system-ui, -apple-system, Segoe UI, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'center';
    ctx.fillText('github.com/Youreln/Cloudpad', canvas.width / 2, canvas.height - 40);
}

// 现代样式
function drawModernStyle(ctx, canvas) {
    // 背景
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 顶部条
    ctx.fillStyle = '#165DFF';
    ctx.fillRect(0, 0, canvas.width, 40);
    
    // Logo
    ctx.font = '40px Font Awesome 6 Free';
    ctx.fillStyle = '#165DFF';
    ctx.textAlign = 'center';
    ctx.fillText('\uf0c2', canvas.width / 2, 100);
    
    // 标题
    ctx.font = '32px system-ui, -apple-system, Segoe UI, sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.textAlign = 'center';
    ctx.fillText('云笺', canvas.width / 2, 160);
    
    // 副标题
    ctx.font = '18px system-ui, -apple-system, Segoe UI, sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'center';
    ctx.fillText('Cloudpad', canvas.width / 2, 190);
    
    // 描述
    ctx.font = '16px system-ui, -apple-system, Segoe UI, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'center';
    ctx.fillText('轻量美观的开源富文本编辑与文本处理工具', canvas.width / 2, 230);
    
    // 功能卡片
    const cardWidth = 200;
    const cardHeight = 80;
    const cardX = (canvas.width - cardWidth) / 2;
    
    features = [
        { icon: '\uf044', text: '富文本编辑' },
        { icon: '\uf12d', text: '文本清洗' },
        { icon: '\uf023', text: '格式转换' },
        { icon: '\uf0ed', text: '一键导出' }
    ];
    
    features.forEach((feature, index) => {
        // 卡片背景
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(cardX, 280 + index * 90, cardWidth, cardHeight);
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.strokeRect(cardX, 280 + index * 90, cardWidth, cardHeight);
        
        // 图标
        ctx.font = '24px Font Awesome 6 Free';
        ctx.fillStyle = '#165DFF';
        ctx.textAlign = 'center';
        ctx.fillText(feature.icon, cardX + 40, 320 + index * 90);
        
        // 文本
        ctx.font = '16px system-ui, -apple-system, Segoe UI, sans-serif';
        ctx.fillStyle = '#1e293b';
        ctx.textAlign = 'left';
        ctx.fillText(feature.text, cardX + 80, 320 + index * 90);
    });
    
    // 底部链接
    ctx.font = '14px system-ui, -apple-system, Segoe UI, sans-serif';
    ctx.fillStyle = '#165DFF';
    ctx.textAlign = 'center';
    ctx.fillText('github.com/Youreln/Cloudpad', canvas.width / 2, canvas.height - 30);
}

// 极简样式
function drawMinimalStyle(ctx, canvas) {
    // 背景
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Logo
    ctx.font = '60px Font Awesome 6 Free';
    ctx.fillStyle = '#165DFF';
    ctx.textAlign = 'center';
    ctx.fillText('\uf0c2', canvas.width / 2, canvas.height / 2 - 60);
    
    // 标题
    ctx.font = '36px system-ui, -apple-system, Segoe UI, sans-serif';
    ctx.fillStyle = '#1e293b';
    ctx.textAlign = 'center';
    ctx.fillText('云笺', canvas.width / 2, canvas.height / 2 + 20);
    
    // 底部链接
    ctx.font = '16px system-ui, -apple-system, Segoe UI, sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'center';
    ctx.fillText('github.com/Youreln/Cloudpad', canvas.width / 2, canvas.height / 2 + 80);
}

// 下载分享图片
function downloadShareImage() {
    const canvas = elements.shareCanvas;
    
    try {
        // 创建下载链接
        const link = document.createElement('a');
        link.download = '云笺分享_' + new Date().toISOString().slice(0, 10) + '.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        showToast('图片已下载');
    } catch (error) {
        showToast('下载失败，请重试');
        console.error('下载图片失败:', error);
    }
}

// 用户相关函数

// 显示用户弹窗
function showUserModal() {
    elements.userModal.classList.add('show');
}

// 隐藏用户弹窗
function hideUserModal() {
    elements.userModal.classList.remove('show');
}

// 切换到注册表单
function switchToRegisterForm() {
    elements.loginForm.style.display = 'none';
    elements.registerForm.style.display = 'block';
    elements.userModalTitle.textContent = '用户注册';
}

// 切换到登录表单
function switchToLoginForm() {
    elements.registerForm.style.display = 'none';
    elements.loginForm.style.display = 'block';
    elements.userModalTitle.textContent = '用户登录';
}

// 登录
function login() {
    const username = elements.loginUsername.value.trim();
    const password = elements.loginPassword.value;
    
    if (!username || !password) {
        showToast('请输入用户名和密码');
        return;
    }
    
    // 从本地存储获取用户数据
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    
    if (users[username] && users[username] === password) {
        // 登录成功
        localStorage.setItem('currentUser', username);
        showToast('登录成功');
        hideUserModal();
        // 加载用户配置
        loadUserConfig();
    } else {
        showToast('用户名或密码错误');
    }
}

// 注册
function register() {
    const username = elements.registerUsername.value.trim();
    const password = elements.registerPassword.value;
    const confirmPassword = elements.registerConfirmPassword.value;
    
    if (!username || !password || !confirmPassword) {
        showToast('请填写所有字段');
        return;
    }
    
    if (password !== confirmPassword) {
        showToast('两次输入的密码不一致');
        return;
    }
    
    // 从本地存储获取用户数据
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    
    if (users[username]) {
        showToast('用户名已存在');
        return;
    }
    
    // 注册成功
    users[username] = password;
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', username);
    showToast('注册成功');
    hideUserModal();
    // 保存默认配置
    saveUserConfig();
}

// 云备份相关函数

// 显示云备份弹窗
function showCloudModal() {
    elements.cloudModal.classList.add('show');
    // 加载保存的 WebDAV 配置
    loadWebdavConfig();
}

// 隐藏云备份弹窗
function hideCloudModal() {
    elements.cloudModal.classList.remove('show');
}

// 加载 WebDAV 配置
function loadWebdavConfig() {
    const config = JSON.parse(localStorage.getItem('webdavConfig') || '{}');
    elements.webdavUrl.value = config.url || '';
    elements.webdavUsername.value = config.username || '';
    elements.webdavPassword.value = config.password || '';
    elements.autoBackup.checked = config.autoBackup || false;
    elements.showFiles.checked = config.showFiles || false;
    elements.localSave.checked = config.localSave || true;
    elements.cloudSave.checked = config.cloudSave || false;
    
    // 如果显示文件，加载文件列表
    if (config.showFiles) {
        elements.backupFiles.style.display = 'block';
        loadFilesList();
    }
}

// 保存 WebDAV 配置
function saveWebdavConfig() {
    const config = {
        url: elements.webdavUrl.value.trim(),
        username: elements.webdavUsername.value.trim(),
        password: elements.webdavPassword.value,
        autoBackup: elements.autoBackup.checked,
        showFiles: elements.showFiles.checked,
        localSave: elements.localSave.checked,
        cloudSave: elements.cloudSave.checked
    };
    
    localStorage.setItem('webdavConfig', JSON.stringify(config));
    showToast('配置保存成功');
    
    // 如果显示文件，加载文件列表
    if (config.showFiles) {
        elements.backupFiles.style.display = 'block';
        loadFilesList();
    } else {
        elements.backupFiles.style.display = 'none';
    }
    
    // 保存用户配置
    saveUserConfig();
}

// 测试 WebDAV 连接
function testWebdavConnection() {
    const url = elements.webdavUrl.value.trim();
    const username = elements.webdavUsername.value.trim();
    const password = elements.webdavPassword.value;
    
    if (!url || !username || !password) {
        showToast('请先填写完整的配置信息');
        return;
    }
    
    // 验证 URL 格式
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        showToast('服务器地址必须以 http:// 或 https:// 开头');
        return;
    }
    
    // 确保 URL 以 / 结尾
    const normalizedUrl = url.endsWith('/') ? url : url + '/';
    
    // 测试连接
    showToast('正在测试连接...');
    
    webdavListFiles(normalizedUrl, username, password)
        .then(() => {
            showToast('连接成功！');
            // 自动保存修正后的 URL
            const config = JSON.parse(localStorage.getItem('webdavConfig') || '{}');
            config.url = normalizedUrl;
            localStorage.setItem('webdavConfig', JSON.stringify(config));
        })
        .catch((error) => {
            showToast('连接失败: ' + error.message);
            console.error('WebDAV 连接失败:', error);
        });
}

// 手动备份
function manualBackup() {
    const content = elements.editor.innerHTML;
    const url = elements.webdavUrl.value.trim();
    const username = elements.webdavUsername.value.trim();
    const password = elements.webdavPassword.value;
    
    if (!url || !username || !password) {
        showToast('请先填写完整的配置信息');
        return;
    }
    
    // 验证 URL 格式
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        showToast('服务器地址必须以 http:// 或 https:// 开头');
        return;
    }
    
    // 确保 URL 以 / 结尾
    const normalizedUrl = url.endsWith('/') ? url : url + '/';
    
    const fileName = 'cloudpad_backup_' + new Date().toISOString().slice(0, 10) + '.html';
    
    showToast('正在备份...');
    
    webdavUploadFile(normalizedUrl, username, password, fileName, content)
        .then(() => {
            showToast('备份成功！');
            // 刷新文件列表
            const config = JSON.parse(localStorage.getItem('webdavConfig') || '{}');
            if (config.showFiles) {
                loadFilesList();
            }
        })
        .catch((error) => {
            showToast('备份失败: ' + error.message);
            console.error('WebDAV 上传失败:', error);
        });
}

// 切换文件列表显示
function toggleFilesList() {
    if (elements.showFiles.checked) {
        elements.backupFiles.style.display = 'block';
        loadFilesList();
    } else {
        elements.backupFiles.style.display = 'none';
    }
}

// 加载文件列表
function loadFilesList() {
    const config = JSON.parse(localStorage.getItem('webdavConfig') || '{}');
    
    if (!config.url || !config.username || !config.password) {
        return;
    }
    
    webdavListFiles(config.url, config.username, config.password)
        .then((files) => {
            renderFilesList(files);
        })
        .catch((error) => {
            console.error('加载文件列表失败:', error);
        });
}

// 渲染文件列表
function renderFilesList(files) {
    elements.filesList.innerHTML = '';
    
    files.forEach((file) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="file-name">${file.name}</span>
            <div class="file-actions">
                <button class="file-action-btn" onclick="downloadFile('${file.name}')" title="下载">
                    <i class="fas fa-download"></i>
                </button>
                <button class="file-action-btn" onclick="deleteFile('${file.name}')" title="删除">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        elements.filesList.appendChild(li);
    });
}

// 下载文件
function downloadFile(fileName) {
    const config = JSON.parse(localStorage.getItem('webdavConfig') || '{}');
    
    webdavDownloadFile(config.url, config.username, config.password, fileName)
        .then((content) => {
            elements.editor.innerHTML = content;
            showToast('文件加载成功');
            updateStats();
        })
        .catch((error) => {
            showToast('文件加载失败');
            console.error('WebDAV 下载失败:', error);
        });
}

// 删除文件
function deleteFile(fileName) {
    if (confirm('确定要删除这个文件吗？')) {
        const config = JSON.parse(localStorage.getItem('webdavConfig') || '{}');
        
        webdavDeleteFile(config.url, config.username, config.password, fileName)
            .then(() => {
                showToast('文件删除成功');
                loadFilesList();
            })
            .catch((error) => {
                showToast('文件删除失败');
                console.error('WebDAV 删除失败:', error);
            });
    }
}

// WebDAV 操作函数

// 列出文件
function webdavListFiles(url, username, password) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        // 检测可能的CORS问题
        console.log('准备发送WebDAV请求到:', url);
        console.log('注意: 如果遇到CORS错误，这是正常的浏览器安全行为');
        
        xhr.open('PROPFIND', url, true);
        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password));
        xhr.setRequestHeader('Depth', '1');
        xhr.setRequestHeader('Content-Type', 'application/xml');
        
        xhr.onload = function() {
            console.log('WebDAV 列表响应状态:', xhr.status);
            console.log('WebDAV 列表响应内容:', xhr.responseText);
            
            if (xhr.status === 207) {
                try {
                    // 解析 XML 响应
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(xhr.responseText, 'application/xml');
                    const responses = doc.getElementsByTagName('response');
                    const files = [];
                    
                    for (let i = 0; i < responses.length; i++) {
                        const response = responses[i];
                        const href = response.getElementsByTagName('href')[0].textContent;
                        const name = href.split('/').pop();
                        
                        // 只显示 HTML 文件
                        if (name && name.endsWith('.html')) {
                            files.push({ name });
                        }
                    }
                    
                    resolve(files);
                } catch (error) {
                    console.error('解析 XML 失败:', error);
                    reject(new Error('解析文件列表失败'));
                }
            } else if (xhr.status === 401) {
                reject(new Error('认证失败，请检查用户名和密码'));
            } else if (xhr.status === 403) {
                reject(new Error('权限不足，请检查服务器地址和文件夹权限'));
            } else if (xhr.status === 404) {
                reject(new Error('服务器地址不存在，请检查地址是否正确'));
            } else if (xhr.status === 0) {
                // 状态码为0通常表示CORS错误或网络错误
                reject(new Error('CORS错误或网络错误: 浏览器可能阻止了跨域请求'));
            } else {
                reject(new Error('WebDAV 列表失败: ' + xhr.status + ' ' + xhr.statusText));
            }
        };
        
        xhr.onerror = function() {
            console.error('WebDAV 连接错误');
            // 提供更详细的错误信息
            const errorMsg = '无法连接到服务器。可能的原因:\n' +
                '1. CORS跨域限制（最常见）\n' +
                '2. 网络连接问题\n' +
                '3. 服务器地址错误\n' +
                '建议: 使用本地保存功能或坚果云桌面客户端';
            reject(new Error(errorMsg));
        };
        
        xhr.ontimeout = function() {
            console.error('WebDAV 连接超时');
            reject(new Error('连接超时，请检查网络连接'));
        };
        
        xhr.timeout = 10000; // 10秒超时
        xhr.send();
    });
}

// 上传文件
function webdavUploadFile(url, username, password, fileName, content) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        // 确保 URL 以 / 结尾
        const normalizedUrl = url.endsWith('/') ? url : url + '/';
        const fileUrl = normalizedUrl + fileName;
        
        console.log('上传文件:', fileUrl);
        
        xhr.open('PUT', fileUrl, true);
        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password));
        xhr.setRequestHeader('Content-Type', 'text/html; charset=utf-8');
        xhr.setRequestHeader('Content-Length', content.length);
        
        xhr.onload = function() {
            console.log('上传响应状态:', xhr.status, xhr.statusText);
            
            if (xhr.status === 201 || xhr.status === 204) {
                resolve();
            } else if (xhr.status === 401) {
                reject(new Error('认证失败，请检查用户名和密码'));
            } else if (xhr.status === 403) {
                reject(new Error('权限不足，无法上传文件'));
            } else if (xhr.status === 404) {
                reject(new Error('服务器地址不存在，请检查地址是否正确'));
            } else {
                reject(new Error('WebDAV 上传失败: ' + xhr.status + ' ' + xhr.statusText));
            }
        };
        
        xhr.onerror = function() {
            console.error('上传连接错误');
            reject(new Error('无法连接到服务器，请检查网络连接'));
        };
        
        xhr.ontimeout = function() {
            console.error('上传超时');
            reject(new Error('上传超时，请检查网络连接'));
        };
        
        xhr.timeout = 30000; // 30秒超时
        xhr.send(content);
    });
}

// 下载文件
function webdavDownloadFile(url, username, password, fileName) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        // 确保 URL 以 / 结尾
        const normalizedUrl = url.endsWith('/') ? url : url + '/';
        const fileUrl = normalizedUrl + fileName;
        
        console.log('下载文件:', fileUrl);
        
        xhr.open('GET', fileUrl, true);
        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password));
        
        xhr.onload = function() {
            console.log('下载响应状态:', xhr.status, xhr.statusText);
            
            if (xhr.status === 200) {
                resolve(xhr.responseText);
            } else if (xhr.status === 401) {
                reject(new Error('认证失败，请检查用户名和密码'));
            } else if (xhr.status === 403) {
                reject(new Error('权限不足，无法下载文件'));
            } else if (xhr.status === 404) {
                reject(new Error('文件不存在'));
            } else {
                reject(new Error('WebDAV 下载失败: ' + xhr.status + ' ' + xhr.statusText));
            }
        };
        
        xhr.onerror = function() {
            console.error('下载连接错误');
            reject(new Error('无法连接到服务器，请检查网络连接'));
        };
        
        xhr.ontimeout = function() {
            console.error('下载超时');
            reject(new Error('下载超时，请检查网络连接'));
        };
        
        xhr.timeout = 30000; // 30秒超时
        xhr.send();
    });
}

// 删除文件
function webdavDeleteFile(url, username, password, fileName) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        // 确保 URL 以 / 结尾
        const normalizedUrl = url.endsWith('/') ? url : url + '/';
        const fileUrl = normalizedUrl + fileName;
        
        console.log('删除文件:', fileUrl);
        
        xhr.open('DELETE', fileUrl, true);
        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password));
        
        xhr.onload = function() {
            console.log('删除响应状态:', xhr.status, xhr.statusText);
            
            if (xhr.status === 204) {
                resolve();
            } else if (xhr.status === 401) {
                reject(new Error('认证失败，请检查用户名和密码'));
            } else if (xhr.status === 403) {
                reject(new Error('权限不足，无法删除文件'));
            } else if (xhr.status === 404) {
                reject(new Error('文件不存在'));
            } else {
                reject(new Error('WebDAV 删除失败: ' + xhr.status + ' ' + xhr.statusText));
            }
        };
        
        xhr.onerror = function() {
            console.error('删除连接错误');
            reject(new Error('无法连接到服务器，请检查网络连接'));
        };
        
        xhr.ontimeout = function() {
            console.error('删除超时');
            reject(new Error('删除超时，请检查网络连接'));
        };
        
        xhr.timeout = 10000; // 10秒超时
        xhr.send();
    });
}

// 用户配置相关函数

// 加载用户配置
function loadUserConfig() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const userConfig = JSON.parse(localStorage.getItem('userConfig_' + currentUser) || '{}');
        // 加载用户的 WebDAV 配置
        if (userConfig.webdavConfig) {
            localStorage.setItem('webdavConfig', JSON.stringify(userConfig.webdavConfig));
        }
    }
}

// 保存用户配置
function saveUserConfig() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const webdavConfig = JSON.parse(localStorage.getItem('webdavConfig') || '{}');
        const userConfig = {
            webdavConfig
        };
        localStorage.setItem('userConfig_' + currentUser, JSON.stringify(userConfig));
    }
}

// 自动备份功能
function autoBackup() {
    const config = JSON.parse(localStorage.getItem('webdavConfig') || '{}');
    
    if (config.cloudSave && config.autoBackup && config.url && config.username && config.password) {
        // 验证 URL 格式
        if (!config.url.startsWith('http://') && !config.url.startsWith('https://')) {
            console.warn('WebDAV URL 格式不正确，跳过自动备份');
            return;
        }
        
        // 确保 URL 以 / 结尾
        const normalizedUrl = config.url.endsWith('/') ? config.url : config.url + '/';
        
        const content = elements.editor.innerHTML;
        const fileName = 'cloudpad_auto_backup_' + new Date().toISOString().slice(0, 10) + '.html';
        
        webdavUploadFile(normalizedUrl, config.username, config.password, fileName, content)
            .then(() => {
                console.log('自动备份成功');
                elements.saveStatus.textContent = '已云端备份';
                setTimeout(() => {
                    elements.saveStatus.textContent = '自动保存中...';
                }, 1000);
            })
            .catch((error) => {
                console.error('自动备份失败:', error);
                elements.saveStatus.textContent = '云端备份失败';
                setTimeout(() => {
                    elements.saveStatus.textContent = '自动保存中...';
                }, 2000);
            });
    }
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

// 初始化自动备份
function initAutoBackup() {
    // 每5分钟自动备份一次
    setInterval(autoBackup, 5 * 60 * 1000);
    
    // 编辑内容变化时也触发备份
    elements.editor.addEventListener('input', () => {
        // 防抖处理，避免频繁备份
        clearTimeout(window.backupTimer);
        window.backupTimer = setTimeout(autoBackup, 30000); // 30秒后备份
    });
}

// 初始化应用
function init() {
    loadFromLocalStorage();
    loadTheme();
    bindEvents();
    updateStats();
    startAutoSave();
    initAutoBackup();
    // 加载当前用户配置
    loadUserConfig();
}

// 初始化应用
init();
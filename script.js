// ==================== 전역 변수 ====================
let currentUser = null;
let selectedDate = new Date();
let currentView = 'day';
let categories = [];
let selectedScheduleEmoji = '';
let selectedTodoEmoji = '';
let selectedMonthGoalEmoji = '🎯';
let selectedDdayEmoji = '🎂';

// 현재 연도/월 추적
let currentCalendarYear = new Date().getFullYear();
let currentCalendarMonth = new Date().getMonth();

// 주간 뷰 추적
let currentWeekStart = null;

// 연간 뷰 추적
let currentYearViewYear = new Date().getFullYear();

// 월간 목표 추적
let currentMonthGoalYear = new Date().getFullYear();
let currentMonthGoalMonth = new Date().getMonth();

// 타이머 변수
let timerInterval = null;
let timerMinutes = 25;
let timerSeconds = 0;
let timerRunning = false;

// EmailJS 설정 (회원가입 시 사용)
const EMAILJS_SERVICE_ID = 'service_ohbcwsq';
const EMAILJS_TEMPLATE_ID = 'template_kobxbii';
const EMAILJS_PUBLIC_KEY = '6jAXWFbGoLy_SPgYU';

// 날씨 API 키
const WEATHER_API_KEY = 'c01f96b11e477edacb227561dd8d8144';

// 포춘쿠키 메시지 + 명언 (80개)
const fortuneMessages = [
    "오늘은 행운이 가득한 날입니다! 🍀",
    "작은 친절이 큰 행복을 가져올 거예요 ✨",
    "당신의 노력이 곧 빛을 발할 것입니다 🌟",
    "새로운 기회가 문을 두드리고 있어요 🚪",
    "오늘 하루, 웃음이 가득하길 바래요 😊",
    "당신의 꿈은 반드시 이루어집니다 💫",
    "긍정적인 마음이 기적을 만들어요 🎯",
    "사랑하는 사람과 좋은 시간을 보내세요 ❤️",
    "오늘 당신은 누군가에게 영감이 됩니다 🌈",
    "용기를 내세요, 당신은 할 수 있어요! 💪",
    "좋은 소식이 곧 찾아올 거예요 📬",
    "당신의 미소가 세상을 밝게 만듭니다 ☀️",
    "오늘은 새로운 시작의 날입니다 🌅",
    "당신은 생각보다 강한 사람이에요 🦁",
    "행복은 작은 것에서 시작됩니다 🌸",
    "당신의 재능이 빛을 발할 때입니다 💎",
    "좋은 친구가 당신 곁에 있어요 👫",
    "오늘 하루가 특별한 날이 될 거예요 🎁",
    "당신의 선택은 항상 옳았습니다 ✅",
    "건강과 행복이 함께하길 바랍니다 🍎",
    
    // 명언 추가
    "행동은 모든 성공의 가장 기본적인 열쇠입니다. \n - 파블로 피카소",
    "노력 없이 쓸 수 있는 글은 읽을 가치가 없다. \n - 새뮤얼 존슨",
    "실패는 성공의 어머니다. \n - 토마스 에디슨",
    "꿈을 이루는 비결은 시작하는 것이다. \n - 월트 디즈니",
    "오늘을 살아라. 어제는 갔고 내일은 오지 않았다. \n - 오쇼 라즈니쉬",
    "할 수 있다고 믿는 사람은 결국 할 수 있다. \n - 버질",
    "가장 어두운 밤이 지나면 가장 밝은 아침이 온다. \n - 빅토르 위고",
    "기회는 준비된 자에게만 온다. \n - 루이 파스퇴르",
    "인내는 쓰지만 그 열매는 달다. \n - 장 자크 루소",
    "변화는 두려워할 것이 아니라 받아들여야 할 것이다. \n - 스펜서 존슨",
    "당신이 할 수 있다고 믿든 할 수 없다고 믿든, 당신이 옳다. \n - 헨리 포드",
    "삶은 자전거를 타는 것과 같다. 균형을 유지하려면 계속 움직여야 한다. \n - 알베르트 아인슈타인",
    "위대한 일을 하려면 먼저 작은 일부터 시작해야 한다. \n - 피터 드러커",
    "실수를 두려워하지 마라. 그것이 배움의 기회다. \n - 존 우든",
    "목표를 이루는 방법은 오직 하나, 시작하는 것이다. \n - 마크 트웨인",
    "성공의 비결은 실패를 두려워하지 않는 것이다. \n - 마이클 조던",
    "당신의 시간은 한정되어 있다. 남의 인생을 사는데 낭비하지 마라. \n - 스티브 잡스",
    "불가능이란 아무것도 하지 않으려는 자의 변명일 뿐이다. \n - 나폴레옹",
    "노력하는 자는 희망이 있다. \n - 공자",
    "인생에서 가장 중요한 것은 멈추지 않는 것이다. \n - 윈스턴 처칠",
    "좋은 일은 찾아오는 것이 아니라 만드는 것이다. \n - 괴테",
    "우리의 가장 큰 영광은 넘어지지 않는 것이 아니라 넘어질 때마다 일어서는 것이다. \n - 공자",
    "당신이 상상할 수 있다면, 당신은 그것을 할 수 있다. \n - 월트 디즈니",
    "작은 기회로부터 위대한 업적이 시작된다. \n - 데모스테네스",
    "미래를 예측하는 가장 좋은 방법은 미래를 창조하는 것이다. \n - 피터 드러커",
    "행복은 습관이다. 그것을 몸에 지녀라. \n - 허버드",
    "당신의 인생을 사랑하라. 당신이 사랑하는 일을 하라. \n - 스티브 잡스",
    "꿈이 있다면 그것을 잡고 절대 놓지 마라. \n - 캐럴 버넷",
    "당신이 되고 싶은 사람이 되기에 너무 늦은 때란 없다. \n - 조지 엘리엇",
    "승자는 결코 포기하지 않고, 포기하는 자는 결코 승리하지 못한다. \n - 빈스 롬바르디",
    "하루하루를 마지막 날처럼 살아라. \n - 스티브 잡스",
    "시작이 반이다. \n - 아리스토텔레스",
    "당신이 할 수 있는 일을 하고, 가진 것으로 최선을 다하라. \n - 시어도어 루즈벨트",
    "천 리 길도 한 걸음부터. \n - 노자",
    "지금 이 순간이 당신의 인생이다. \n - 오쇼 라즈니쉬",
    "배움에는 끝이 없다. \n - 플라톤",
    "행복의 문이 하나 닫히면 다른 문이 열린다. \n - 헬렌 켈러",
    "오늘 할 수 있는 일을 내일로 미루지 마라. \n - 벤저민 프랭클린",
    "인생은 과감한 모험이거나 아무것도 아니다. \n - 헬렌 켈러",
    "당신이 두려워하는 것을 매일 하나씩 하라. \n - 엘리너 루즈벨트"
];

// 명상 세션 변수
let meditationInterval = null;
let meditationPhase = 'inhale';

// 스톱워치 변수
let stopwatchInterval = null;
let stopwatchTime = 0;
let stopwatchRunning = false;
let laps = [];

// 드래그 앤 드롭 변수
let draggedSchedule = null;

// ==================== 전역 함수 노출 ====================
window.openScheduleModal = openScheduleModal;
window.closeScheduleModal = closeScheduleModal;
window.openTodoModal = openTodoModal;
window.closeTodoModal = closeTodoModal;
window.openCategoryModal = openCategoryModal;
window.closeCategoryModal = closeCategoryModal;
window.openYearGoalModal = openYearGoalModal;
window.closeYearGoalModal = closeYearGoalModal;
window.openMonthGoalModal = openMonthGoalModal;
window.closeMonthGoalModal = closeMonthGoalModal;
window.closeMonthGoalCalendarModal = closeMonthGoalCalendarModal;
window.openMemoModal = openMemoModal;
window.closeMemoModal = closeMemoModal;
window.openDiaryModal = openDiaryModal;
window.closeDiaryModal = closeDiaryModal;
window.openTimecapsuleModal = openTimecapsuleModal;
window.closeTimecapsuleModal = closeTimecapsuleModal;
window.openDdayModal = openDdayModal;
window.closeDdayModal = closeDdayModal;
window.openAlarmModal = openAlarmModal;
window.closeAlarmModal = closeAlarmModal;
window.closeDayTodosModal = closeDayTodosModal;
window.closeDayStatsModal = closeDayStatsModal;
window.deleteCategory = deleteCategory;
window.deleteYearGoal = deleteYearGoal;
window.deleteMonthGoal = deleteMonthGoal;
window.deleteDday = deleteDday;
window.toggleAlarm = toggleAlarm;
window.deleteAlarm = deleteAlarm;
window.selectMood = selectMood;
window.breakCookie = breakCookie;
window.resetCookie = resetCookie;
window.startMeditation = startMeditation;
window.stopMeditation = stopMeditation;
window.setTimer = setTimer;

// ==================== 완료율 선택기 ====================
function initCompletionSelector(hiddenInputId) {
    const hiddenInput = document.getElementById(hiddenInputId);
    if (!hiddenInput) return;
    
    const modal = hiddenInput.closest('.modal-content');
    if (!modal) return;
    
    const buttons = modal.querySelectorAll('.completion-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            buttons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            const completion = btn.dataset.completion;
            hiddenInput.value = completion;
        });
    });
}

// ==================== 로그인 페이지 ====================
if (window.location.pathname.includes('login.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        
        const showSignupBtn = document.getElementById('showSignup');
        const showLoginBtn = document.getElementById('showLogin');
        const backToSignupBtn = document.getElementById('backToSignup');
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        const verificationForm = document.getElementById('verificationForm');
        
        let verificationCode = '';
        let tempUserData = {};
        
        showSignupBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
        });
        
        showLoginBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            signupForm.style.display = 'none';
            loginForm.style.display = 'block';
        });
        
        backToSignupBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            verificationForm.style.display = 'none';
            signupForm.style.display = 'block';
        });
        
        document.getElementById('loginFormElement')?.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;
            
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'home.html';
            } else {
                alert('이메일 또는 비밀번호가 올바르지 않습니다.');
            }
        });
        
        document.getElementById('signupFormElement')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('signupName').value.trim();
            const email = document.getElementById('signupEmail').value.trim();
            const password = document.getElementById('signupPassword').value;
            const passwordConfirm = document.getElementById('signupPasswordConfirm').value;
            
            if (password.length < 8) {
                alert('비밀번호는 8자 이상이어야 합니다.');
                return;
            }
            
            if (password !== passwordConfirm) {
                alert('비밀번호가 일치하지 않습니다.');
                return;
            }
            
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            if (users.find(u => u.email === email)) {
                alert('이미 등록된 이메일입니다.');
                return;
            }
            
            verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
            
            try {
                await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    {
                        to_email: email,
                        to_name: name,
                        verification_code: verificationCode
                    }
                );
                
                console.log('인증 코드:', verificationCode);
                
                tempUserData = { name, email, password };
                
                document.getElementById('verificationEmail').textContent = email;
                signupForm.style.display = 'none';
                verificationForm.style.display = 'block';
                
            } catch (error) {
                console.error('이메일 전송 실패:', error);
                console.log('시뮬레이션 모드: 인증 코드는', verificationCode);
                
                tempUserData = { name, email, password };
                
                document.getElementById('verificationEmail').textContent = email;
                signupForm.style.display = 'none';
                verificationForm.style.display = 'block';
            }
        });
        
        document.getElementById('verificationFormElement')?.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const code = document.getElementById('verificationCode').value.trim();
            
            if (code === verificationCode) {
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                users.push(tempUserData);
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('currentUser', JSON.stringify(tempUserData));
                
                alert('회원가입이 완료되었습니다!');
                window.location.href = 'home.html';
            } else {
                alert('인증 코드가 올바르지 않습니다.');
            }
        });
        
        document.getElementById('resendCode')?.addEventListener('click', async () => {
            verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
            
            try {
                await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    {
                        to_email: tempUserData.email,
                        to_name: tempUserData.name,
                        verification_code: verificationCode
                    }
                );
                
                console.log('새 인증 코드:', verificationCode);
                alert('인증 코드를 재발송했습니다.');
            } catch (error) {
                console.error('이메일 재전송 실패:', error);
                console.log('시뮬레이션 모드: 새 인증 코드는', verificationCode);
                alert('인증 코드를 재발송했습니다. (시뮬레이션)');
            }
        });
    });
}

// ==================== 메인 앱 초기화 ====================
if (window.location.pathname.includes('index.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        initMainPage();
    });
}

function initMainPage() {
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) {
        window.location.href = 'login.html';
        return;
    }
    
    currentUser = JSON.parse(userStr);
    
    const userNameEl = document.getElementById('userName');
    if (userNameEl) {
        userNameEl.textContent = `${currentUser.name}님`;
    }
    
    loadCategories();
    populateTimeSelects();
    populateCategorySelects();
    
    // 이모티콘 선택기 초기화
    initEmojiSelector('todoEmojiSelector', 'todoEmoji', 'todo');
    initEmojiSelector('scheduleEmojiSelector', 'scheduleEmoji', 'schedule');
    initEmojiSelector('monthGoalEmojiSelector', 'monthGoalEmoji', 'monthGoal');
    initEmojiSelector('ddayEmojiSelector', 'ddayEmoji', 'dday');
    
    // 완료율 선택기 초기화
    initCompletionSelector('scheduleCompletion');
    initCompletionSelector('todoCompletion');
    
    renderCalendar();
    updateSelectedDate();
    renderTimetable();
    
    // 초기 뷰 설정
    const initialView = localStorage.getItem('initialView') || 'day';
    switchView(initialView);
    localStorage.removeItem('initialView');
    
    // 이벤트 리스너
    document.getElementById('prevMonth')?.addEventListener('click', () => {
        currentCalendarMonth--;
        if (currentCalendarMonth < 0) {
            currentCalendarMonth = 11;
            currentCalendarYear--;
        }
        renderCalendar();
    });
    
    document.getElementById('nextMonth')?.addEventListener('click', () => {
        currentCalendarMonth++;
        if (currentCalendarMonth > 11) {
            currentCalendarMonth = 0;
            currentCalendarYear++;
        }
        renderCalendar();
    });
    
    document.getElementById('todayBtn')?.addEventListener('click', () => {
        selectedDate = new Date();
        currentCalendarYear = selectedDate.getFullYear();
        currentCalendarMonth = selectedDate.getMonth();
        renderCalendar();
        updateSelectedDate();
        renderTimetable();
    });
    
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            switchView(view);
        });
    });
    
    document.getElementById('darkModeToggleApp')?.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        document.getElementById('darkModeToggleApp').textContent = isDark ? '☀️' : '🌙';
    });
    
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeToggleApp').textContent = '☀️';
    }
    
    document.getElementById('logoutBtn')?.addEventListener('click', () => {
        if (confirm('로그아웃 하시겠습니까?')) {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        }
    });
    
    document.getElementById('saveScheduleBtn')?.addEventListener('click', saveSchedule);
    document.getElementById('saveTodoBtn')?.addEventListener('click', saveTodo);
    document.getElementById('saveCategoryBtn')?.addEventListener('click', saveCategory);
    document.getElementById('saveYearGoalBtn')?.addEventListener('click', saveYearGoal);
    document.getElementById('saveMonthGoalBtn')?.addEventListener('click', saveMonthGoal);
    document.getElementById('saveMemoModalBtn')?.addEventListener('click', saveMemoModal);
    document.getElementById('saveDiaryBtn')?.addEventListener('click', saveDiary);
    document.getElementById('saveTimecapsuleBtn')?.addEventListener('click', saveTimecapsule);
    document.getElementById('saveDdayBtn')?.addEventListener('click', saveDday);
    document.getElementById('saveAlarmBtn')?.addEventListener('click', saveAlarm);
    
    document.getElementById('scheduleRepeat')?.addEventListener('change', (e) => {
        document.getElementById('repeatOptions').style.display = e.target.checked ? 'block' : 'none';
    });
    
    document.getElementById('todoRepeat')?.addEventListener('change', (e) => {
        document.getElementById('todoRepeatOptions').style.display = e.target.checked ? 'block' : 'none';
    });
    
    document.getElementById('todoNotification')?.addEventListener('change', (e) => {
        document.getElementById('todoNotificationOptions').style.display = e.target.checked ? 'block' : 'none';
    });
    
    document.getElementById('categoryColor')?.addEventListener('input', (e) => {
        document.getElementById('colorPreview').style.background = e.target.value;
    });
    
    const memoImageInput = document.getElementById('memoModalImageInput');
    if (memoImageInput) {
        memoImageInput.addEventListener('change', handleMemoImageUpload);
    }
    
    document.getElementById('sortSelect')?.addEventListener('change', loadTodosForView);
    
    // 주간 뷰 네비게이션
    document.getElementById('prevWeek')?.addEventListener('click', () => {
        currentWeekStart.setDate(currentWeekStart.getDate() - 7);
        renderWeekView();
    });
    
    document.getElementById('nextWeek')?.addEventListener('click', () => {
        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
        renderWeekView();
    });
    
    // 연간 뷰 네비게이션
    document.getElementById('prevYear')?.addEventListener('click', () => {
        currentYearViewYear--;
        renderYearView();
    });
    
    document.getElementById('nextYear')?.addEventListener('click', () => {
        currentYearViewYear++;
        renderYearView();
    });
    
    // 월간 목표 네비게이션
    document.getElementById('prevMonthGoal')?.addEventListener('click', () => {
        currentMonthGoalMonth--;
        if (currentMonthGoalMonth < 0) {
            currentMonthGoalMonth = 11;
            currentMonthGoalYear--;
        }
        renderMonthGoalView();
    });
    
    document.getElementById('nextMonthGoal')?.addEventListener('click', () => {
        currentMonthGoalMonth++;
        if (currentMonthGoalMonth > 11) {
            currentMonthGoalMonth = 0;
            currentMonthGoalYear++;
        }
        renderMonthGoalView();
    });
    
    // 타이머 이벤트
    document.getElementById('timerStart')?.addEventListener('click', startTimer);
    document.getElementById('timerPause')?.addEventListener('click', pauseTimer);
    document.getElementById('timerReset')?.addEventListener('click', resetTimer);
    
    // 스톱워치 이벤트
    document.getElementById('stopwatchStart')?.addEventListener('click', startStopwatch);
    document.getElementById('stopwatchPause')?.addEventListener('click', pauseStopwatch);
    document.getElementById('stopwatchReset')?.addEventListener('click', resetStopwatch);
    document.getElementById('stopwatchLap')?.addEventListener('click', recordLap);
    
    // 시계 탭
    document.querySelectorAll('.clock-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            
            document.querySelectorAll('.clock-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.clock-tab-content').forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(tabName + 'Tab').classList.add('active');
            
            if (tabName === 'alarm') {
                loadAlarms();
            }
        });
    });
    
    const timecapsuleDate = document.getElementById('timecapsuleDate');
    if (timecapsuleDate) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        timecapsuleDate.min = tomorrow.toISOString().split('T')[0];
    }
}

// ==================== 이모티콘 선택기 ====================
function initEmojiSelector(selectorId, hiddenInputId, type) {
    const selector = document.getElementById(selectorId);
    if (!selector) return;
    
    const hiddenInput = document.getElementById(hiddenInputId);
    const buttons = selector.querySelectorAll('.emoji-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            buttons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            
            const emoji = btn.dataset.emoji;
            hiddenInput.value = emoji;
            
            if (type === 'schedule') selectedScheduleEmoji = emoji;
            else if (type === 'todo') selectedTodoEmoji = emoji;
            else if (type === 'monthGoal') selectedMonthGoalEmoji = emoji;
            else if (type === 'dday') selectedDdayEmoji = emoji;
        });
    });
}

// ==================== 날짜 관련 함수 ====================
function getDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function updateSelectedDate() {
    const dateStr = selectedDate.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });
    
    const dateHeader = document.getElementById('selectedDate');
    if (dateHeader) {
        dateHeader.textContent = dateStr;
    }
}

// ==================== 캘린더 렌더링 ====================
function renderCalendar() {
    const calendar = document.getElementById('calendar');
    if (!calendar) return;
    
    calendar.innerHTML = '';
    
    const monthLabel = document.getElementById('currentMonth');
    if (monthLabel) {
        monthLabel.textContent = `${currentCalendarYear}년 ${currentCalendarMonth + 1}월`;
    }
    
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    weekdays.forEach(day => {
        const weekdayEl = document.createElement('div');
        weekdayEl.className = 'calendar-weekday';
        weekdayEl.textContent = day;
        calendar.appendChild(weekdayEl);
    });
    
    const firstDay = new Date(currentCalendarYear, currentCalendarMonth, 1);
    const lastDay = new Date(currentCalendarYear, currentCalendarMonth + 1, 0);
    const prevLastDay = new Date(currentCalendarYear, currentCalendarMonth, 0);
    
    const firstDayOfWeek = firstDay.getDay();
    const lastDate = lastDay.getDate();
    const prevLastDate = prevLastDay.getDate();
    
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day other-month';
        dayEl.textContent = prevLastDate - i;
        calendar.appendChild(dayEl);
    }
    
    for (let date = 1; date <= lastDate; date++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';
        dayEl.textContent = date;
        
        const currentDate = new Date(currentCalendarYear, currentCalendarMonth, date);
        const today = new Date();
        
        if (currentDate.toDateString() === today.toDateString()) {
            dayEl.classList.add('today');
        }
        
        if (currentDate.toDateString() === selectedDate.toDateString()) {
            dayEl.classList.add('selected');
        }
        
        dayEl.addEventListener('click', () => {
            selectedDate = new Date(currentCalendarYear, currentCalendarMonth, date);
            renderCalendar();
            updateSelectedDate();
            renderTimetable();
        });
        
        calendar.appendChild(dayEl);
    }
    
    const remainingDays = 42 - (firstDayOfWeek + lastDate);
    for (let date = 1; date <= remainingDays; date++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day other-month';
        dayEl.textContent = date;
        calendar.appendChild(dayEl);
    }
}

// ==================== 뷰 전환 ====================
function switchView(viewName) {
    currentView = viewName;
    
    document.querySelectorAll('.view-content').forEach(view => {
        view.classList.remove('active');
    });
    
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const viewContent = document.getElementById(viewName + 'View');
    if (viewContent) {
        viewContent.classList.add('active');
    }
    
    const viewBtn = document.querySelector(`.view-btn[data-view="${viewName}"]`);
    if (viewBtn) {
        viewBtn.classList.add('active');
    }
    
    switch(viewName) {
        case 'day':
            renderTimetable();
            break;
        case 'week':
            renderWeekView();
            break;
        case 'month':
            renderMonthView();
            break;
        case 'year':
            renderYearView();
            break;
        case 'monthGoal':
            renderMonthGoalView();
            break;
        case 'stats':
            renderStats();
            break;
        case 'todo':
            loadTodosForView();
            break;
        case 'memo':
            loadMemos();
            break;
        case 'diary':
            loadDiaries();
            break;
        case 'timecapsule':
            loadTimecapsules();
            break;
        case 'dday':
            loadDdayView();
            break;
        case 'clock':
            break;
        case 'fortune':
            resetCookie();
            break;
        case 'meditation':
            break;
        case 'category':
            renderCategoryView();
            break;
    }
}

// ==================== 시간 선택 초기화 ====================
function populateTimeSelects() {
    const selects = [
        document.getElementById('scheduleStartTime'),
        document.getElementById('scheduleEndTime'),
        document.getElementById('todoNotificationTime')
    ];
    
    selects.forEach(select => {
        if (!select) return;
        
        select.innerHTML = '';
        
        // 30분 단위로 시간 생성
        for (let hour = 0; hour < 24; hour++) {
            for (let min = 0; min < 60; min += 30) {
                const timeValue = hour + (min / 60);
                const timeStr = `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
                const option = document.createElement('option');
                option.value = timeValue;
                option.textContent = timeStr;
                select.appendChild(option);
            }
        }
    });
    
    // 기본값 설정
    if (document.getElementById('scheduleStartTime')) {
        document.getElementById('scheduleStartTime').value = '9';
    }
    if (document.getElementById('scheduleEndTime')) {
        document.getElementById('scheduleEndTime').value = '10';
    }
}

// ==================== 카테고리 ====================
function loadCategories() {
    const userKey = `categories_${currentUser.email}`;
    categories = JSON.parse(localStorage.getItem(userKey) || '[]');
}

function populateCategorySelects() {
    const selects = [
        document.getElementById('scheduleCategory'),
        document.getElementById('todoCategory'),
        document.getElementById('yearGoalCategory')
    ];
    
    selects.forEach(select => {
        if (!select) return;
        
        const currentValue = select.value;
        select.innerHTML = '<option value="">카테고리 없음</option>';
        
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.name;
            select.appendChild(option);
        });
        
        if (currentValue) {
            select.value = currentValue;
        }
    });
}

function openCategoryModal() {
    const modal = document.getElementById('categoryModal');
    if (modal) {
        document.getElementById('categoryInput').value = '';
        document.getElementById('categoryColor').value = '#78C3FB';
        document.getElementById('colorPreview').style.background = '#78C3FB';
        modal.classList.add('active');
    }
}

function closeCategoryModal() {
    document.getElementById('categoryModal').classList.remove('active');
}

function saveCategory() {
    const name = document.getElementById('categoryInput').value.trim();
    const color = document.getElementById('categoryColor').value;
    
    if (!name) {
        alert('카테고리 이름을 입력해주세요.');
        return;
    }
    
    const newCategory = {
        id: Date.now(),
        name: name,
        color: color
    };
    
    categories.push(newCategory);
    
    const userKey = `categories_${currentUser.email}`;
    localStorage.setItem(userKey, JSON.stringify(categories));
    
    populateCategorySelects();
    renderCategoryView();
    closeCategoryModal();
    
    alert('카테고리가 추가되었습니다!');
}

function deleteCategory(id) {
    if (!confirm('이 카테고리를 삭제하시겠습니까?')) return;
    
    categories = categories.filter(c => c.id !== id);
    
    const userKey = `categories_${currentUser.email}`;
    localStorage.setItem(userKey, JSON.stringify(categories));
    
    populateCategorySelects();
    renderCategoryView();
}

function renderCategoryView() {
    const container = document.getElementById('categoryListView');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (categories.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🏷️</div><div class="empty-state-text">카테고리가 없습니다.<br>새 카테고리를 추가해보세요!</div></div>';
        return;
    }
    
    categories.forEach(cat => {
        const item = document.createElement('div');
        item.className = 'category-item';
        item.style.background = cat.color;
        
        item.innerHTML = `
            <div class="category-name">${cat.name}</div>
            <div class="category-actions">
                <button onclick="deleteCategory(${cat.id})">삭제</button>
            </div>
        `;
        
        container.appendChild(item);
    });
}

// ==================== 일정 관리 ====================
function getSchedules(dateKey) {
    const userKey = `schedules_${currentUser.email}_${dateKey}`;
    return JSON.parse(localStorage.getItem(userKey) || '[]');
}

function saveSchedules(dateKey, schedules) {
    const userKey = `schedules_${currentUser.email}_${dateKey}`;
    localStorage.setItem(userKey, JSON.stringify(schedules));
}

function openScheduleModal() {
    const modal = document.getElementById('scheduleModal');
    if (modal) {
        document.getElementById('scheduleModalTitle').textContent = '일정 추가';
        document.getElementById('scheduleTitle').value = '';
        document.getElementById('scheduleStartTime').value = '9';
        document.getElementById('scheduleEndTime').value = '10';
        document.getElementById('scheduleCategory').value = '';
        document.getElementById('scheduleRepeat').checked = false;
        document.getElementById('scheduleNotification').checked = false;
        document.getElementById('repeatOptions').style.display = 'none';
        document.getElementById('scheduleEditId').value = '';
        
        // 완료율 초기화
        document.getElementById('scheduleCompletion').value = '0';
        document.querySelectorAll('#scheduleModal .completion-btn').forEach(btn => {
            btn.classList.remove('selected');
            if (btn.dataset.completion === '0') {
                btn.classList.add('selected');
            }
        });
        
        selectedScheduleEmoji = '';
        document.getElementById('scheduleEmoji').value = '';
        document.querySelectorAll('#scheduleEmojiSelector .emoji-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        modal.classList.add('active');
    }
}

function closeScheduleModal() {
    document.getElementById('scheduleModal').classList.remove('active');
}

function editSchedule(id, dateKey) {
    const schedules = getSchedules(dateKey);
    const schedule = schedules.find(s => s.id === id);
    
    if (!schedule) return;
    
    // 모달 열기
    const modal = document.getElementById('scheduleModal');
    if (!modal) return;
    
    // 모달 제목 변경
    document.getElementById('scheduleModalTitle').textContent = '일정 수정';
    
    // 기존 값 채우기
    document.getElementById('scheduleTitle').value = schedule.title;
    document.getElementById('scheduleStartTime').value = schedule.startTime;
    document.getElementById('scheduleEndTime').value = schedule.endTime;
    document.getElementById('scheduleCategory').value = schedule.categoryId || '';
    document.getElementById('scheduleRepeat').checked = schedule.isRepeat || false;
    document.getElementById('scheduleNotification').checked = schedule.hasNotification || false;
    document.getElementById('scheduleEditId').value = id;
    
    // 완료율 설정
    const completion = schedule.completion || 0;
    document.getElementById('scheduleCompletion').value = completion;
    document.querySelectorAll('#scheduleModal .completion-btn').forEach(btn => {
        btn.classList.remove('selected');
        if (parseInt(btn.dataset.completion) === completion) {
            btn.classList.add('selected');
        }
    });
    
    // 이모티콘 설정
    selectedScheduleEmoji = schedule.emoji || '';
    document.getElementById('scheduleEmoji').value = selectedScheduleEmoji;
    document.querySelectorAll('#scheduleEmojiSelector .emoji-btn').forEach(btn => {
        btn.classList.remove('selected');
        if (btn.dataset.emoji === selectedScheduleEmoji) {
            btn.classList.add('selected');
        }
    });
    
    if (schedule.isRepeat) {
        document.getElementById('repeatOptions').style.display = 'block';
        document.getElementById('repeatType').value = schedule.repeatType;
    }
    
    modal.classList.add('active');
}

function saveSchedule() {
    const title = document.getElementById('scheduleTitle').value.trim();
    const startTime = parseFloat(document.getElementById('scheduleStartTime').value);
    const endTime = parseFloat(document.getElementById('scheduleEndTime').value);
    const categoryId = document.getElementById('scheduleCategory').value;
    const isRepeat = document.getElementById('scheduleRepeat').checked;
    const repeatType = document.getElementById('repeatType').value;
    const hasNotification = document.getElementById('scheduleNotification').checked;
    const emoji = selectedScheduleEmoji;
    const completion = parseInt(document.getElementById('scheduleCompletion').value);
    const editId = document.getElementById('scheduleEditId').value;
    
    if (!title) {
        alert('일정 제목을 입력해주세요.');
        return;
    }
    
    if (startTime >= endTime) {
        alert('종료 시간은 시작 시간보다 늦어야 합니다.');
        return;
    }
    
    const dateKey = getDateKey(selectedDate);
    const schedules = getSchedules(dateKey);
    
    if (editId) {
        // 수정 모드
        const schedule = schedules.find(s => s.id == editId);
        if (schedule) {
            schedule.title = title;
            schedule.startTime = startTime;
            schedule.endTime = endTime;
            schedule.categoryId = categoryId || null;
            schedule.isRepeat = isRepeat;
            schedule.repeatType = isRepeat ? repeatType : null;
            schedule.hasNotification = hasNotification;
            schedule.emoji = emoji;
            schedule.completion = completion;
        }
    } else {
        // 새로 추가
        const newSchedule = {
            id: Date.now(),
            title: title,
            startTime: startTime,
            endTime: endTime,
            categoryId: categoryId || null,
            isRepeat: isRepeat,
            repeatType: isRepeat ? repeatType : null,
            hasNotification: hasNotification,
            emoji: emoji,
            completion: completion,
            column: 0
        };
        
        schedules.push(newSchedule);
        
        if (isRepeat) {
            saveRepeatingSchedule(newSchedule);
        }
    }
    
    saveSchedules(dateKey, schedules);
    closeScheduleModal();
    renderTimetable();
    
    // 모달 제목 원래대로
    document.getElementById('scheduleModalTitle').textContent = '일정 추가';
    document.getElementById('scheduleEditId').value = '';
    
    alert(editId ? '일정이 수정되었습니다!' : '일정이 추가되었습니다!');
}

function deleteSchedule(id, dateKey) {
    if (!confirm('이 일정을 삭제하시겠습니까?')) return;
    
    let schedules = getSchedules(dateKey);
    schedules = schedules.filter(s => s.id !== id);
    saveSchedules(dateKey, schedules);
    renderTimetable();
}

function updateScheduleCompletion(id, dateKey) {
    const schedules = getSchedules(dateKey);
    const schedule = schedules.find(s => s.id === id);
    
    if (!schedule) return;
    
    const completionOptions = [0, 25, 50, 75, 100];
    const currentIndex = completionOptions.indexOf(schedule.completion || 0);
    const nextIndex = (currentIndex + 1) % completionOptions.length;
    
    schedule.completion = completionOptions[nextIndex];
    
    saveSchedules(dateKey, schedules);
    renderTimetable();
}

function saveRepeatingSchedule(schedule) {
    const userKey = `repeating_schedules_${currentUser.email}`;
    const repeatingSchedules = JSON.parse(localStorage.getItem(userKey) || '[]');
    repeatingSchedules.push(schedule);
    localStorage.setItem(userKey, JSON.stringify(repeatingSchedules));
}

// ==================== 드래그 앤 드롭 ====================
function handleDragStart(e) {
    draggedSchedule = e.target;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    draggedSchedule = null;
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    if (!draggedSchedule) return false;
    
    const dropTarget = e.currentTarget;
    const rect = dropTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    // 5개 구역 중 어느 구역에 드롭했는지 계산
    const column = Math.floor((x / width) * 5);
    const clampedColumn = Math.max(0, Math.min(4, column));
    
    // 일정 ID 가져오기
    const scheduleId = parseInt(draggedSchedule.dataset.scheduleId);
    const dateKey = getDateKey(selectedDate);
    const schedules = getSchedules(dateKey);
    
    const schedule = schedules.find(s => s.id === scheduleId);
    if (schedule) {
        schedule.column = clampedColumn;
        saveSchedules(dateKey, schedules);
        renderTimetable();
    }
    
    return false;
}

// ==================== 타임테이블 렌더링 ====================
function renderTimetable() {
    const timetable = document.getElementById('timetable');
    if (!timetable) return;
    
    timetable.innerHTML = '';
    
    const dateKey = getDateKey(selectedDate);
    const schedules = getSchedules(dateKey);
    
    // 30분 단위로 행 생성
    for (let hour = 0; hour < 24; hour++) {
        for (let min = 0; min < 60; min += 30) {
            const row = document.createElement('div');
            row.className = 'timetable-row';
            row.dataset.hour = hour;
            row.dataset.minute = min;
            
            const timeCell = document.createElement('div');
            timeCell.className = 'timetable-time';
            timeCell.textContent = `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
            
            const contentCell = document.createElement('div');
            contentCell.className = 'timetable-content';
            
            // 드롭 영역으로 설정
            contentCell.addEventListener('dragover', handleDragOver);
            contentCell.addEventListener('drop', handleDrop);
            
            row.appendChild(timeCell);
            row.appendChild(contentCell);
            timetable.appendChild(row);
        }
    }
    
    // 모든 행을 가져오기
    const allRows = Array.from(timetable.querySelectorAll('.timetable-row'));
    
    // 일정들을 배치
    schedules.forEach((schedule) => {
        const startTimeInMinutes = schedule.startTime * 60;
        const endTimeInMinutes = schedule.endTime * 60;
        
        // 시작 행 인덱스 (30분 단위)
        const startRowIndex = Math.floor(startTimeInMinutes / 30);
        
        if (startRowIndex >= allRows.length) return;
        
        const startRow = allRows[startRowIndex];
        const contentCell = startRow.querySelector('.timetable-content');
        
        // 일정 높이 계산 (분 단위로 정확하게)
        const durationInMinutes = endTimeInMinutes - startTimeInMinutes;
        const eventHeight = (durationInMinutes / 30) * 80; // 30분 = 80px
        
        // 시작 위치 오프셋 계산 (30분 칸 내에서의 위치)
        const startMinuteInSlot = startTimeInMinutes % 30;
        const topOffset = (startMinuteInSlot / 30) * 80;
        
        // 일정 요소 생성
        const event = document.createElement('div');
        event.className = 'timetable-event';
        event.dataset.scheduleId = schedule.id;
        event.dataset.column = schedule.column || 0;
        event.setAttribute('data-column', schedule.column || 0);
        event.draggable = true;
        
        event.style.height = `${Math.max(eventHeight, 40)}px`;
        event.style.top = `${topOffset}px`;
        
        // 카테고리 색상 적용
        if (schedule.categoryId) {
            const category = categories.find(c => c.id == schedule.categoryId);
            if (category) {
                event.style.background = category.color;
            }
        } else {
            event.style.background = '#42A5F5';
        }
        
        // 드래그 이벤트
        event.addEventListener('dragstart', handleDragStart);
        event.addEventListener('dragend', handleDragEnd);
        
        // 일정 헤더
        const header = document.createElement('div');
        header.className = 'timetable-event-header';
        
        const title = document.createElement('div');
        title.className = 'timetable-event-title';
        const emojiSpan = schedule.emoji ? `${schedule.emoji} ` : '';
        const hours = Math.floor(durationInMinutes / 60);
        const minutes = durationInMinutes % 60;
        const durationText = hours > 0 ? `${hours}시간 ${minutes}분` : `${minutes}분`;
        title.innerHTML = `${emojiSpan}${schedule.title}<br><small>(${durationText})</small>`;
        
        // 완료율 배지
        const completion = schedule.completion || 0;
        if (completion > 0) {
            const completionBadge = document.createElement('span');
            completionBadge.className = 'schedule-completion-badge';
            completionBadge.textContent = `${completion}%`;
            title.appendChild(completionBadge);
        }
        
        // 액션 버튼
        const actions = document.createElement('div');
        actions.className = 'timetable-event-actions';
        
        const completeBtn = document.createElement('button');
        completeBtn.className = 'timetable-event-complete';
        completeBtn.textContent = '완료';
        completeBtn.onclick = (e) => {
            e.stopPropagation();
            updateScheduleCompletion(schedule.id, dateKey);
        };
        
        const editBtn = document.createElement('button');
        editBtn.className = 'timetable-event-edit';
        editBtn.textContent = '수정';
        editBtn.onclick = (e) => {
            e.stopPropagation();
            editSchedule(schedule.id, dateKey);
        };
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'timetable-event-delete';
        deleteBtn.textContent = '삭제';
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            deleteSchedule(schedule.id, dateKey);
        };
        
        actions.appendChild(completeBtn);
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        
        header.appendChild(title);
        header.appendChild(actions);
        
        event.appendChild(header);
        contentCell.appendChild(event);
    });
    
    // 통계 버튼 추가
    const existingBtn = timetable.parentElement.querySelector('.timetable-stats-btn');
    if (existingBtn) {
        existingBtn.remove();
    }
    
    const statsBtn = document.createElement('button');
    statsBtn.className = 'timetable-stats-btn';
    statsBtn.textContent = '📊 오늘의 일정 통계 보기';
    statsBtn.onclick = showDayStats;
    timetable.parentElement.appendChild(statsBtn);
}

// ==================== 일간 통계 ====================
function showDayStats() {
    const dateKey = getDateKey(selectedDate);
    const schedules = getSchedules(dateKey);
    
    if (schedules.length === 0) {
        alert('오늘은 일정이 없습니다.');
        return;
    }
    
    // 카테고리별 시간 집계
    const categoryTimes = {};
    
    schedules.forEach(schedule => {
        const duration = schedule.endTime - schedule.startTime;
        const categoryId = schedule.categoryId || 'none';
        
        if (!categoryTimes[categoryId]) {
            categoryTimes[categoryId] = 0;
        }
        categoryTimes[categoryId] += duration;
    });
    
    // 모달 내용 생성
    const modal = document.getElementById('dayStatsModal');
    const content = document.getElementById('dayStatsModalContent');
    
    if (!modal || !content) return;
    
    content.innerHTML = '';
    
    Object.keys(categoryTimes).forEach(categoryId => {
        const hours = categoryTimes[categoryId];
        const hoursDisplay = Math.floor(hours);
        const minutesDisplay = Math.round((hours % 1) * 60);
        
        let categoryName = '카테고리 없음';
        let categoryColor = '#BDBDBD';
        
        if (categoryId !== 'none') {
            const category = categories.find(c => c.id == categoryId);
            if (category) {
                categoryName = category.name;
                categoryColor = category.color;
            }
        }
        
        const item = document.createElement('div');
        item.className = 'day-stat-item';
        item.innerHTML = `
            <div class="day-stat-category">
                <div class="day-stat-color" style="background: ${categoryColor};"></div>
                <div class="day-stat-name">${categoryName}</div>
            </div>
            <div class="day-stat-time">${hoursDisplay}시간 ${minutesDisplay}분</div>
        `;
        content.appendChild(item);
    });
    
    modal.classList.add('active');
}

function closeDayStatsModal() {
    document.getElementById('dayStatsModal')?.classList.remove('active');
}

// ==================== 할 일 관리 ====================
function getTodos(dateKey) {
    const userKey = `todos_${currentUser.email}_${dateKey}`;
    return JSON.parse(localStorage.getItem(userKey) || '[]');
}

function saveTodos(dateKey, todos) {
    const userKey = `todos_${currentUser.email}_${dateKey}`;
    localStorage.setItem(userKey, JSON.stringify(todos));
}

function openTodoModal() {
    const modal = document.getElementById('todoModal');
    if (modal) {
        document.getElementById('todoTitle').value = '';
        document.getElementById('todoDate').value = getDateKey(selectedDate);
        document.getElementById('todoPriority').value = 'medium';
        document.getElementById('todoCategory').value = '';
        document.getElementById('todoRepeat').checked = false;
        document.getElementById('todoNotification').checked = false;
        document.getElementById('todoRepeatOptions').style.display = 'none';
        document.getElementById('todoNotificationOptions').style.display = 'none';
        
        // 완료율 초기화
        document.getElementById('todoCompletion').value = '0';
        document.querySelectorAll('#todoModal .completion-btn').forEach(btn => {
            btn.classList.remove('selected');
            if (btn.dataset.completion === '0') {
                btn.classList.add('selected');
            }
        });
        
        selectedTodoEmoji = '';
        document.getElementById('todoEmoji').value = '';
        document.querySelectorAll('#todoEmojiSelector .emoji-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        modal.classList.add('active');
    }
}

function closeTodoModal() {
    document.getElementById('todoModal').classList.remove('active');
}

function saveTodo() {
    const title = document.getElementById('todoTitle').value.trim();
    const dateValue = document.getElementById('todoDate').value;
    const priority = document.getElementById('todoPriority').value;
    const categoryId = document.getElementById('todoCategory').value;
    const isRepeat = document.getElementById('todoRepeat').checked;
    const repeatType = document.getElementById('todoRepeatType').value;
    const hasNotification = document.getElementById('todoNotification').checked;
    const notificationTime = document.getElementById('todoNotificationTime').value;
    const emoji = selectedTodoEmoji;
    const completion = parseInt(document.getElementById('todoCompletion').value);
    
    if (!title) {
        alert('할 일 제목을 입력해주세요.');
        return;
    }
    
    if (!dateValue) {
        alert('날짜를 선택해주세요.');
        return;
    }
    
    const dateKey = dateValue;
    const todos = getTodos(dateKey);
    
    const newTodo = {
        id: Date.now(),
        text: title,
        completed: completion === 100,
        completion: completion,
        priority: priority,
        categoryId: categoryId || null,
        createdAt: new Date().toISOString(),
        isRepeat: isRepeat,
        repeatType: isRepeat ? repeatType : null,
        hasNotification: hasNotification,
        notificationTime: hasNotification ? parseFloat(notificationTime) : null,
        emoji: emoji
    };
    
    todos.push(newTodo);
    saveTodos(dateKey, todos);
    
    if (isRepeat) {
        saveRepeatingTodo(newTodo);
    }
    
    closeTodoModal();
    loadTodosForView();
    alert('할 일이 추가되었습니다!');
}

function saveRepeatingTodo(todo) {
    const userKey = `repeating_todos_${currentUser.email}`;
    const repeatingTodos = JSON.parse(localStorage.getItem(userKey) || '[]');
    repeatingTodos.push(todo);
    localStorage.setItem(userKey, JSON.stringify(repeatingTodos));
}

function updateTodoCompletion(id, dateKey) {
    const todos = getTodos(dateKey);
    const todo = todos.find(t => t.id === id);
    
    if (!todo) return;
    
    const completionOptions = [0, 25, 50, 75, 100];
    const currentIndex = completionOptions.indexOf(todo.completion || 0);
    const nextIndex = (currentIndex + 1) % completionOptions.length;
    
    todo.completion = completionOptions[nextIndex];
    todo.completed = todo.completion === 100;
    
    saveTodos(dateKey, todos);
    loadTodosForView();
}

function deleteTodo(id, dateKey) {
    if (!confirm('이 할 일을 삭제하시겠습니까?')) return;
    
    let todos = getTodos(dateKey);
    todos = todos.filter(t => t.id !== id);
    saveTodos(dateKey, todos);
    loadTodosForView();
}

function createTodoElement(todo, dateKey) {
    const item = document.createElement('div');
    item.className = `todo-item priority-${todo.priority}` + (todo.completed ? ' completed' : '');
    
    // 완료율 표시로 변경
    const completionDiv = document.createElement('div');
    completionDiv.className = 'todo-completion';
    completionDiv.style.cssText = 'min-width: 60px; font-weight: 600; color: #42A5F5; cursor: pointer;';
    completionDiv.textContent = `${todo.completion || 0}%`;
    completionDiv.addEventListener('click', () => updateTodoCompletion(todo.id, dateKey));
    
    const text = document.createElement('span');
    text.className = 'todo-text';
    const emojiSpan = todo.emoji ? `<span class="todo-emoji">${todo.emoji}</span>` : '';
    text.innerHTML = emojiSpan + todo.text;
    
    const priorityBadge = document.createElement('span');
    priorityBadge.className = `todo-priority ${todo.priority}`;
    const priorityText = { high: '높음', medium: '중간', low: '낮음' };
    priorityBadge.textContent = priorityText[todo.priority];
    
    item.appendChild(completionDiv);
    item.appendChild(text);
    item.appendChild(priorityBadge);
    
    if (todo.isRepeat) {
        const repeatIcon = document.createElement('span');
        repeatIcon.className = 'repeat-icon';
        const repeatText = { daily: '매일', weekly: '매주', monthly: '매월', yearly: '매년' };
        repeatIcon.textContent = '🔄 ' + repeatText[todo.repeatType];
        item.appendChild(repeatIcon);
    }
    
    if (todo.hasNotification) {
        const notifIcon = document.createElement('span');
        notifIcon.className = 'notification-badge';
        notifIcon.textContent = '🔔';
        item.appendChild(notifIcon);
    }
    
    if (todo.categoryId) {
        const category = categories.find(c => c.id == todo.categoryId);
        if (category) {
            const categoryBadge = document.createElement('span');
            categoryBadge.className = 'todo-category-badge';
            categoryBadge.textContent = category.name;
            categoryBadge.style.backgroundColor = category.color;
            item.appendChild(categoryBadge);
        }
    }
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-delete';
    deleteBtn.textContent = '삭제';
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id, dateKey));
    
    item.appendChild(deleteBtn);
    
    return item;
}

function loadTodosForView() {
    const container = document.getElementById('todoList');
    if (!container) return;
    
    container.innerHTML = '';
    
    // 모든 날짜의 할 일 가져오기
    const allTodos = [];
    const userKeyPrefix = `todos_${currentUser.email}_`;
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(userKeyPrefix)) {
            const dateKey = key.replace(userKeyPrefix, '');
            const todos = getTodos(dateKey);
            todos.forEach(todo => {
                allTodos.push({ ...todo, dateKey: dateKey });
            });
        }
    }
    
    if (allTodos.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">✅</div><div class="empty-state-text">할 일이 없습니다.<br>새로운 할 일을 추가해보세요!</div></div>';
        return;
    }
    
    // 정렬
    const sortType = document.getElementById('sortSelect')?.value || 'date';
    
    if (sortType === 'date') {
        allTodos.sort((a, b) => a.dateKey.localeCompare(b.dateKey));
    } else if (sortType === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        allTodos.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    } else if (sortType === 'alphabetical') {
        allTodos.sort((a, b) => a.text.localeCompare(b.text));
    }
    
    // 날짜별로 그룹화
    const groupedByDate = {};
    allTodos.forEach(todo => {
        if (!groupedByDate[todo.dateKey]) {
            groupedByDate[todo.dateKey] = [];
        }
        groupedByDate[todo.dateKey].push(todo);
    });
    
    // 렌더링
    Object.keys(groupedByDate).sort().forEach(dateKey => {
        const dateHeader = document.createElement('div');
        dateHeader.style.cssText = 'font-weight: 700; font-size: 1.2em; color: #42A5F5; margin: 20px 0 10px 0; padding-bottom: 8px; border-bottom: 2px solid #E0E0E0;';
        dateHeader.textContent = dateKey;
        container.appendChild(dateHeader);
        
        groupedByDate[dateKey].forEach(todo => {
            const todoEl = createTodoElement(todo, dateKey);
            container.appendChild(todoEl);
        });
    });
}

// ==================== 주간 뷰 ====================
function renderWeekView() {
    const container = document.getElementById('weekViewContent');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!currentWeekStart) {
        currentWeekStart = new Date(selectedDate);
        currentWeekStart.setDate(selectedDate.getDate() - selectedDate.getDay());
    }
    
    const weekLabel = document.getElementById('currentWeekLabel');
    if (weekLabel) {
        const weekEnd = new Date(currentWeekStart);
        weekEnd.setDate(currentWeekStart.getDate() + 6);
        weekLabel.textContent = `${currentWeekStart.getFullYear()}년 ${currentWeekStart.getMonth() + 1}월 ${currentWeekStart.getDate()}일 - ${weekEnd.getMonth() + 1}월 ${weekEnd.getDate()}일`;
    }
    
    const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(currentWeekStart);
        date.setDate(currentWeekStart.getDate() + i);
        
        const card = createWeekDayCard(date, dayNames[i]);
        container.appendChild(card);
    }
}

function createWeekDayCard(date, dayName) {
    const card = document.createElement('div');
    card.className = 'week-day-card';
    
    const header = document.createElement('div');
    header.className = 'week-day-header';
    
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
        header.classList.add('today');
    }
    
    header.textContent = `${dayName} ${date.getDate()}일`;
    card.appendChild(header);
    
    const dateKey = getDateKey(date);
    const schedules = getSchedules(dateKey);
    
    // 일정 3개 표시 (시간순)
    const sortedSchedules = [...schedules].sort((a, b) => a.startTime - b.startTime);
    
    sortedSchedules.slice(0, 3).forEach(schedule => {
        const scheduleMini = document.createElement('div');
        scheduleMini.className = 'week-todo-mini';
        
        const startHour = Math.floor(schedule.startTime);
        const startMin = Math.round((schedule.startTime % 1) * 60);
        const timeStr = `${String(startHour).padStart(2, '0')}:${String(startMin).padStart(2, '0')}`;
        
        const emojiSpan = schedule.emoji ? `${schedule.emoji} ` : '';
        scheduleMini.textContent = `${timeStr} ${emojiSpan}${schedule.title}`;
        
        // 완료율에 따라 스타일 적용
        const completion = schedule.completion || 0;
        if (completion === 100) {
            scheduleMini.style.textDecoration = 'line-through';
            scheduleMini.style.opacity = '0.6';
        } else if (completion > 0) {
            scheduleMini.style.opacity = '0.8';
        }
        
        card.appendChild(scheduleMini);
    });
    
    if (schedules.length > 3) {
        const more = document.createElement('div');
        more.className = 'week-todo-mini';
        more.textContent = `+${schedules.length - 3}개 더보기`;
        more.style.color = '#42A5F5';
        more.style.fontWeight = '600';
        card.appendChild(more);
    }
    
    card.addEventListener('click', () => {
        selectedDate = new Date(date);
        openDaySchedulesModal(date, schedules);
    });
    
    return card;
}

function openDaySchedulesModal(date, schedules) {
    const modal = document.getElementById('dayTodosModal');
    if (!modal) return;
    
    const title = document.getElementById('dayTodosModalTitle');
    const content = document.getElementById('dayTodosModalContent');
    
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    title.textContent = `${date.getMonth() + 1}월 ${date.getDate()}일 (${dayNames[date.getDay()]}) 일정`;
    
    content.innerHTML = '';
    
    if (schedules.length === 0) {
        content.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📅</div><div class="empty-state-text">일정이 없습니다.</div></div>';
    } else {
        const dateKey = getDateKey(date);
        const sortedSchedules = [...schedules].sort((a, b) => a.startTime - b.startTime);
        
        sortedSchedules.forEach(schedule => {
            const item = document.createElement('div');
            item.className = 'day-todo-modal-item';
            
            const startHour = Math.floor(schedule.startTime);
            const startMin = Math.round((schedule.startTime % 1) * 60);
            const endHour = Math.floor(schedule.endTime);
            const endMin = Math.round((schedule.endTime % 1) * 60);
            
            const timeStr = `${String(startHour).padStart(2, '0')}:${String(startMin).padStart(2, '0')} - ${String(endHour).padStart(2, '0')}:${String(endMin).padStart(2, '0')}`;
            
            const completion = schedule.completion || 0;
            
            const text = document.createElement('div');
            text.style.flex = '1';
            const emojiSpan = schedule.emoji ? `${schedule.emoji} ` : '';
            text.innerHTML = `<strong>${timeStr}</strong><br>${emojiSpan}${schedule.title} <span style="color: #42A5F5; font-weight: 600;">(${completion}%)</span>`;
            
            if (completion === 100) {
                text.style.textDecoration = 'line-through';
                text.style.opacity = '0.6';
            }
            
            item.appendChild(text);
            content.appendChild(item);
        });
    }
    
    modal.classList.add('active');
}

function closeDayTodosModal() {
    document.getElementById('dayTodosModal')?.classList.remove('active');
}

// ==================== 월간 뷰 ====================
function renderMonthView() {
    const container = document.getElementById('monthViewContent');
    if (!container) return;
    
    container.innerHTML = '';
    
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const lastDate = lastDay.getDate();
    
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    weekdays.forEach(day => {
        const weekdayEl = document.createElement('div');
        weekdayEl.style.cssText = 'text-align: center; font-weight: 600; color: #757575; padding: 12px 4px; font-size: 1em;';
        weekdayEl.textContent = day;
        container.appendChild(weekdayEl);
    });
    
    const prevLastDay = new Date(year, month, 0);
    const prevLastDate = prevLastDay.getDate();
    
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const emptyCard = document.createElement('div');
        emptyCard.style.cssText = 'background: #F5F5F5; border-radius: 8px; padding: 12px; opacity: 0.3;';
        emptyCard.textContent = prevLastDate - i;
        container.appendChild(emptyCard);
    }
    
    for (let date = 1; date <= lastDate; date++) {
        const card = createMonthDayCard(date, year, month);
        container.appendChild(card);
    }
}

function createMonthDayCard(date, year, month) {
    const card = document.createElement('div');
    card.className = 'month-day-card';
    
    const number = document.createElement('div');
    number.className = 'month-day-number';
    
    const today = new Date();
    if (date === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
        number.classList.add('today');
    }
    
    number.textContent = date;
    card.appendChild(number);
    
    const dateObj = new Date(year, month, date);
    const dateKey = getDateKey(dateObj);
    const todos = getTodos(dateKey);
    const schedules = getSchedules(dateKey);
    
    // 할 일 표시 (우선순위 높은 것 3개)
    const todosDiv = document.createElement('div');
    todosDiv.className = 'month-day-todos';
    
    // 우선순위로 정렬
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const sortedTodos = [...todos].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    
    // 상위 3개만 표시
    sortedTodos.slice(0, 3).forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.className = 'month-day-todo-item';
        const emojiSpan = todo.emoji ? `${todo.emoji} ` : '';
        todoItem.textContent = `${emojiSpan}${todo.text}`;
        if (todo.completed) {
            todoItem.style.textDecoration = 'line-through';
            todoItem.style.opacity = '0.6';
        }
        todosDiv.appendChild(todoItem);
    });
    
    if (todos.length > 3) {
        const moreItem = document.createElement('div');
        moreItem.className = 'month-day-todo-item';
        moreItem.textContent = `+${todos.length - 3}개 더보기`;
        moreItem.style.color = '#42A5F5';
        moreItem.style.fontWeight = '600';
        todosDiv.appendChild(moreItem);
    }
    
    if (todos.length > 0 || schedules.length > 0) {
        card.appendChild(todosDiv);
    }
    
    card.addEventListener('click', () => {
        selectedDate = new Date(dateObj);
        switchView('day');
    });
    
    return card;
}

// ==================== 연간 뷰 ====================
function renderYearView() {
    const container = document.getElementById('yearGoalsList');
    const monthsGrid = document.getElementById('yearMonthsGrid');
    
    if (!container || !monthsGrid) return;
    
    const yearLabel = document.getElementById('currentYear');
    if (yearLabel) {
        yearLabel.textContent = `${currentYearViewYear}년`;
    }
    
    // 연간 목표 로드
    const userKey = `year_goals_${currentUser.email}_${currentYearViewYear}`;
    const yearGoals = JSON.parse(localStorage.getItem(userKey) || '[]');
    
    container.innerHTML = '';
    
    if (yearGoals.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🎯</div><div class="empty-state-text">연간 목표가 없습니다.<br>새로운 목표를 설정해보세요!</div></div>';
    } else {
        yearGoals.forEach(goal => {
            const card = document.createElement('div');
            card.className = 'year-goal-card';
            
            if (goal.categoryId) {
                const category = categories.find(c => c.id == goal.categoryId);
                if (category) {
                    card.style.borderLeftColor = category.color;
                }
            }
            
            card.innerHTML = `
                <div class="year-goal-title">${goal.title}</div>
                <div class="year-goal-description">${goal.description}</div>
                <div class="year-goal-progress">
                    <div class="year-goal-progress-bar">
                        <div class="year-goal-progress-fill" style="width: ${goal.progress || 0}%"></div>
                    </div>
                    <div class="year-goal-progress-text">${goal.progress || 0}%</div>
                </div>
                <div class="year-goal-actions">
                    <button class="btn-edit" onclick="event.stopPropagation(); alert('목표 수정 기능은 추후 추가됩니다.')">수정</button>
                    <button class="btn-delete-small" onclick="event.stopPropagation(); deleteYearGoal(${goal.id})">삭제</button>
                </div>
            `;
            
            container.appendChild(card);
        });
    }
    
    // 월별 통계
    monthsGrid.innerHTML = '';
    
    const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    
    monthNames.forEach((monthName, monthIndex) => {
        let totalTodos = 0;
        let completedTodos = 0;
        
        // 해당 월의 모든 날짜 확인
        const daysInMonth = new Date(currentYearViewYear, monthIndex + 1, 0).getDate();
        
        for (let day = 1; day <= daysInMonth; day++) {
            const dateKey = `${currentYearViewYear}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const todos = getTodos(dateKey);
            totalTodos += todos.length;
            completedTodos += todos.filter(t => t.completed).length;
        }
        
        const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;
        
        const card = document.createElement('div');
        card.className = 'year-month-card';
        card.innerHTML = `
            <div class="year-month-name">${monthName}</div>
            <div class="year-month-stats">
                <div class="year-month-stat">
                    <span>전체 할 일</span>
                    <span class="year-month-stat-value">${totalTodos}</span>
                </div>
                <div class="year-month-stat">
                    <span>완료</span>
                    <span class="year-month-stat-value">${completedTodos}</span>
                </div>
                <div class="year-month-stat">
                    <span>달성률</span>
                    <span class="year-month-stat-value">${completionRate}%</span>
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => {
            selectedDate = new Date(currentYearViewYear, monthIndex, 1);
            switchView('month');
        });
        
        monthsGrid.appendChild(card);
    });
}

function openYearGoalModal() {
    const modal = document.getElementById('yearGoalModal');
    if (modal) {
        document.getElementById('yearGoalTitle').value = '';
        document.getElementById('yearGoalDescription').value = '';
        document.getElementById('yearGoalCategory').value = '';
        modal.classList.add('active');
    }
}

function closeYearGoalModal() {
    document.getElementById('yearGoalModal')?.classList.remove('active');
}

function saveYearGoal() {
    const title = document.getElementById('yearGoalTitle').value.trim();
    const description = document.getElementById('yearGoalDescription').value.trim();
    const categoryId = document.getElementById('yearGoalCategory').value;
    
    if (!title) {
        alert('목표 제목을 입력해주세요.');
        return;
    }
    
    const userKey = `year_goals_${currentUser.email}_${currentYearViewYear}`;
    const yearGoals = JSON.parse(localStorage.getItem(userKey) || '[]');
    
    const newGoal = {
        id: Date.now(),
        title: title,
        description: description,
        categoryId: categoryId || null,
        progress: 0,
        createdAt: new Date().toISOString()
    };
    
    yearGoals.push(newGoal);
    localStorage.setItem(userKey, JSON.stringify(yearGoals));
    
    closeYearGoalModal();
    renderYearView();
    alert('연간 목표가 추가되었습니다!');
}

function deleteYearGoal(id) {
    if (!confirm('이 목표를 삭제하시겠습니까?')) return;
    
    const userKey = `year_goals_${currentUser.email}_${currentYearViewYear}`;
    let yearGoals = JSON.parse(localStorage.getItem(userKey) || '[]');
    yearGoals = yearGoals.filter(g => g.id !== id);
    localStorage.setItem(userKey, JSON.stringify(yearGoals));
    
    renderYearView();
}

function createTodoElement(todo, dateKey) {
    const item = document.createElement('div');
    item.className = `todo-item priority-${todo.priority}` + (todo.completed ? ' completed' : '');
    
    // 완료율 표시로 변경
    const completionDiv = document.createElement('div');
    completionDiv.className = 'todo-completion';
    completionDiv.style.cssText = 'min-width: 60px; font-weight: 600; color: #42A5F5; cursor: pointer;';
    completionDiv.textContent = `${todo.completion || 0}%`;
    completionDiv.addEventListener('click', () => updateTodoCompletion(todo.id, dateKey));
    
    const text = document.createElement('span');
    text.className = 'todo-text';
    const emojiSpan = todo.emoji ? `<span class="todo-emoji">${todo.emoji}</span>` : '';
    text.innerHTML = emojiSpan + todo.text;
    
    const priorityBadge = document.createElement('span');
    priorityBadge.className = `todo-priority ${todo.priority}`;
    const priorityText = { high: '높음', medium: '중간', low: '낮음' };
    priorityBadge.textContent = priorityText[todo.priority];
    
    item.appendChild(completionDiv);
    item.appendChild(text);
    item.appendChild(priorityBadge);
    
    if (todo.isRepeat) {
        const repeatIcon = document.createElement('span');
        repeatIcon.className = 'repeat-icon';
        const repeatText = { daily: '매일', weekly: '매주', monthly: '매월', yearly: '매년' };
        repeatIcon.textContent = '🔄 ' + repeatText[todo.repeatType];
        item.appendChild(repeatIcon);
    }
    
    if (todo.hasNotification) {
        const notifIcon = document.createElement('span');
        notifIcon.className = 'notification-badge';
        notifIcon.textContent = '🔔';
        item.appendChild(notifIcon);
    }
    
    if (todo.categoryId) {
        const category = categories.find(c => c.id == todo.categoryId);
        if (category) {
            const categoryBadge = document.createElement('span');
            categoryBadge.className = 'todo-category-badge';
            categoryBadge.textContent = category.name;
            categoryBadge.style.backgroundColor = category.color;
            item.appendChild(categoryBadge);
        }
    }
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-delete';
    deleteBtn.textContent = '삭제';
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id, dateKey));
    
    item.appendChild(deleteBtn);
    
    return item;
}

function loadTodosForView() {
    const todoList = document.getElementById('todoList');
    if (!todoList) return;
    
    todoList.innerHTML = '';
    
    // 모든 날짜의 할 일 가져오기
    const allTodos = [];
    const userKeyPrefix = `todos_${currentUser.email}_`;
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(userKeyPrefix)) {
            const dateKey = key.replace(userKeyPrefix, '');
            const todos = getTodos(dateKey);
            todos.forEach(todo => {
                allTodos.push({ ...todo, dateKey });
            });
        }
    }
    
    if (allTodos.length === 0) {
        todoList.innerHTML = '<div class="empty-state"><div class="empty-state-icon">✅</div><div class="empty-state-text">할 일이 없습니다.<br>새로운 할 일을 추가해보세요!</div></div>';
        return;
    }
    
    // 정렬
    const sortType = document.getElementById('sortSelect')?.value || 'date';
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    
    if (sortType === 'date') {
        allTodos.sort((a, b) => a.dateKey.localeCompare(b.dateKey));
    } else if (sortType === 'priority') {
        allTodos.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    } else if (sortType === 'alphabetical') {
        allTodos.sort((a, b) => a.text.localeCompare(b.text));
    }
    
    // 날짜별로 그룹화
    let currentDate = null;
    
    allTodos.forEach(todo => {
        if (todo.dateKey !== currentDate) {
            currentDate = todo.dateKey;
            const dateHeader = document.createElement('div');
            dateHeader.style.cssText = 'font-weight: 700; font-size: 1.2em; color: #42A5F5; margin: 20px 0 10px 0; padding: 10px; background: #E3F2FD; border-radius: 8px;';
            dateHeader.textContent = currentDate;
            todoList.appendChild(dateHeader);
        }
        
        const todoElement = createTodoElement(todo, todo.dateKey);
        todoList.appendChild(todoElement);
    });
}

// ==================== 주간 뷰 ====================
function renderWeekView() {
    const weekViewContent = document.getElementById('weekViewContent');
    if (!weekViewContent) return;
    
    weekViewContent.innerHTML = '';
    
    // 현재 주의 시작 계산
    if (!currentWeekStart) {
        currentWeekStart = new Date(selectedDate);
        currentWeekStart.setDate(selectedDate.getDate() - selectedDate.getDay());
    }
    
    // 주 레이블 업데이트
    const weekLabel = document.getElementById('currentWeekLabel');
    if (weekLabel) {
        const weekEnd = new Date(currentWeekStart);
        weekEnd.setDate(currentWeekStart.getDate() + 6);
        weekLabel.textContent = `${currentWeekStart.getMonth() + 1}월 ${currentWeekStart.getDate()}일 - ${weekEnd.getMonth() + 1}월 ${weekEnd.getDate()}일`;
    }
    
    const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(currentWeekStart);
        date.setDate(currentWeekStart.getDate() + i);
        
        const card = createWeekDayCard(date, dayNames[i]);
        weekViewContent.appendChild(card);
    }
}

function createWeekDayCard(date, dayName) {
    const card = document.createElement('div');
    card.className = 'week-day-card';
    
    const header = document.createElement('div');
    header.className = 'week-day-header';
    
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
        header.classList.add('today');
    }
    
    header.textContent = `${dayName} ${date.getDate()}일`;
    card.appendChild(header);
    
    const dateKey = getDateKey(date);
    const schedules = getSchedules(dateKey);
    
    // 일정 3개 표시 (시간순)
    const sortedSchedules = [...schedules].sort((a, b) => a.startTime - b.startTime);
    
    sortedSchedules.slice(0, 3).forEach(schedule => {
        const scheduleMini = document.createElement('div');
        scheduleMini.className = 'week-todo-mini';
        
        const startHour = Math.floor(schedule.startTime);
        const startMin = Math.round((schedule.startTime % 1) * 60);
        const timeStr = `${String(startHour).padStart(2, '0')}:${String(startMin).padStart(2, '0')}`;
        
        const emojiSpan = schedule.emoji ? `${schedule.emoji} ` : '';
        scheduleMini.textContent = `${timeStr} ${emojiSpan}${schedule.title}`;
        
        // 완료율에 따라 스타일 적용
        const completion = schedule.completion || 0;
        if (completion === 100) {
            scheduleMini.style.textDecoration = 'line-through';
            scheduleMini.style.opacity = '0.6';
        } else if (completion > 0) {
            scheduleMini.style.opacity = '0.8';
        }
        
        card.appendChild(scheduleMini);
    });
    
    if (schedules.length > 3) {
        const more = document.createElement('div');
        more.className = 'week-todo-mini';
        more.textContent = `+${schedules.length - 3}개 더보기`;
        more.style.color = '#42A5F5';
        more.style.fontWeight = '600';
        card.appendChild(more);
    }
    
    card.addEventListener('click', () => {
        selectedDate = new Date(date);
        openDaySchedulesModal(date, schedules);
    });
    
    return card;
}

function openDaySchedulesModal(date, schedules) {
    const modal = document.getElementById('dayTodosModal');
    if (!modal) return;
    
    const title = document.getElementById('dayTodosModalTitle');
    const content = document.getElementById('dayTodosModalContent');
    
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    title.textContent = `${date.getMonth() + 1}월 ${date.getDate()}일 (${dayNames[date.getDay()]}) 일정`;
    
    content.innerHTML = '';
    
    if (schedules.length === 0) {
        content.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📅</div><div class="empty-state-text">일정이 없습니다.</div></div>';
    } else {
        const dateKey = getDateKey(date);
        const sortedSchedules = [...schedules].sort((a, b) => a.startTime - b.startTime);
        
        sortedSchedules.forEach(schedule => {
            const item = document.createElement('div');
            item.className = 'day-todo-modal-item';
            
            const startHour = Math.floor(schedule.startTime);
            const startMin = Math.round((schedule.startTime % 1) * 60);
            const endHour = Math.floor(schedule.endTime);
            const endMin = Math.round((schedule.endTime % 1) * 60);
            
            const timeStr = `${String(startHour).padStart(2, '0')}:${String(startMin).padStart(2, '0')} - ${String(endHour).padStart(2, '0')}:${String(endMin).padStart(2, '0')}`;
            
            const completion = schedule.completion || 0;
            
            const text = document.createElement('div');
            text.style.flex = '1';
            const emojiSpan = schedule.emoji ? `${schedule.emoji} ` : '';
            text.innerHTML = `<strong>${timeStr}</strong><br>${emojiSpan}${schedule.title} <span style="color: #42A5F5; font-weight: 600;">(${completion}%)</span>`;
            
            if (completion === 100) {
                text.style.textDecoration = 'line-through';
                text.style.opacity = '0.6';
            }
            
            item.appendChild(text);
            content.appendChild(item);
        });
    }
    
    modal.classList.add('active');
}

function closeDayTodosModal() {
    document.getElementById('dayTodosModal')?.classList.remove('active');
}

// ==================== 월간 뷰 ====================
function renderMonthView() {
    const monthViewContent = document.getElementById('monthViewContent');
    if (!monthViewContent) return;
    
    monthViewContent.innerHTML = '';
    
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    weekdays.forEach(day => {
        const weekdayEl = document.createElement('div');
        weekdayEl.style.cssText = 'text-align: center; font-weight: 600; color: #757575; padding: 12px 4px; font-size: 1em;';
        weekdayEl.textContent = day;
        monthViewContent.appendChild(weekdayEl);
    });
    
    const firstDayOfWeek = firstDay.getDay();
    const lastDate = lastDay.getDate();
    
    for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyEl = document.createElement('div');
        monthViewContent.appendChild(emptyEl);
    }
    
    for (let date = 1; date <= lastDate; date++) {
        const card = createMonthDayCard(date, year, month);
        monthViewContent.appendChild(card);
    }
}

function createMonthDayCard(date, year, month) {
    const card = document.createElement('div');
    card.className = 'month-day-card';
    
    const number = document.createElement('div');
    number.className = 'month-day-number';
    
    const today = new Date();
    if (date === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
        number.classList.add('today');
    }
    
    number.textContent = date;
    card.appendChild(number);
    
    const dateObj = new Date(year, month, date);
    const dateKey = getDateKey(dateObj);
    const todos = getTodos(dateKey);
    const schedules = getSchedules(dateKey);
    
    // 할 일 표시 (우선순위 높은 것 3개)
    const todosDiv = document.createElement('div');
    todosDiv.className = 'month-day-todos';
    
    // 우선순위로 정렬
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const sortedTodos = [...todos].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    
    // 상위 3개만 표시
    sortedTodos.slice(0, 3).forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.className = 'month-day-todo-item';
        const emojiSpan = todo.emoji ? `${todo.emoji} ` : '';
        todoItem.textContent = `${emojiSpan}${todo.text}`;
        if (todo.completed) {
            todoItem.style.textDecoration = 'line-through';
            todoItem.style.opacity = '0.6';
        }
        todosDiv.appendChild(todoItem);
    });
    
    if (todos.length > 3) {
        const moreItem = document.createElement('div');
        moreItem.className = 'month-day-todo-item';
        moreItem.textContent = `+${todos.length - 3}개 더보기`;
        moreItem.style.color = '#42A5F5';
        moreItem.style.fontWeight = '600';
        todosDiv.appendChild(moreItem);
    }
    
    if (todos.length > 0 || schedules.length > 0) {
        card.appendChild(todosDiv);
    }
    
    card.addEventListener('click', () => {
        selectedDate = new Date(dateObj);
        switchView('day');
    });
    
    return card;
}

// ==================== 연간 뷰 ====================
function renderYearView() {
    const yearGoalsList = document.getElementById('yearGoalsList');
    const yearMonthsGrid = document.getElementById('yearMonthsGrid');
    const currentYearEl = document.getElementById('currentYear');
    
    if (currentYearEl) {
        currentYearEl.textContent = `${currentYearViewYear}년`;
    }
    
    // 연간 목표 로드
    if (yearGoalsList) {
        yearGoalsList.innerHTML = '';
        
        const userKey = `year_goals_${currentUser.email}_${currentYearViewYear}`;
        const yearGoals = JSON.parse(localStorage.getItem(userKey) || '[]');
        
        if (yearGoals.length === 0) {
            yearGoalsList.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🎯</div><div class="empty-state-text">연간 목표가 없습니다.</div></div>';
        } else {
            yearGoals.forEach(goal => {
                const card = document.createElement('div');
                card.className = 'year-goal-card';
                
                let categoryColor = '#42A5F5';
                if (goal.categoryId) {
                    const category = categories.find(c => c.id == goal.categoryId);
                    if (category) categoryColor = category.color;
                }
                card.style.borderLeftColor = categoryColor;
                
                card.innerHTML = `
                    <div class="year-goal-title">${goal.title}</div>
                    <div class="year-goal-description">${goal.description}</div>
                    <div class="year-goal-actions">
                        <button class="btn-delete-small" onclick="deleteYearGoal(${goal.id})">삭제</button>
                    </div>
                `;
                
                yearGoalsList.appendChild(card);
            });
        }
    }
    
    // 월별 통계
    if (yearMonthsGrid) {
        yearMonthsGrid.innerHTML = '';
        
        for (let month = 0; month < 12; month++) {
            const card = document.createElement('div');
            card.className = 'year-month-card';
            
            // 해당 월의 모든 일정과 할일 계산
            let totalSchedules = 0;
            let totalTodos = 0;
            let completedTodos = 0;
            
            const daysInMonth = new Date(currentYearViewYear, month + 1, 0).getDate();
            
            for (let day = 1; day <= daysInMonth; day++) {
                const dateKey = `${currentYearViewYear}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const schedules = getSchedules(dateKey);
                const todos = getTodos(dateKey);
                
                totalSchedules += schedules.length;
                totalTodos += todos.length;
                completedTodos += todos.filter(t => t.completed).length;
            }
            
            const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;
            
            card.innerHTML = `
                <div class="year-month-name">${month + 1}월</div>
                <div class="year-month-stats">
                    <div class="year-month-stat">
                        <span>일정</span>
                        <span class="year-month-stat-value">${totalSchedules}개</span>
                    </div>
                    <div class="year-month-stat">
                        <span>할 일</span>
                        <span class="year-month-stat-value">${totalTodos}개</span>
                    </div>
                    <div class="year-month-stat">
                        <span>달성률</span>
                        <span class="year-month-stat-value">${completionRate}%</span>
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => {
                selectedDate = new Date(currentYearViewYear, month, 1);
                currentCalendarYear = currentYearViewYear;
                currentCalendarMonth = month;
                renderCalendar();
                switchView('month');
            });
            
            yearMonthsGrid.appendChild(card);
        }
    }
}

function openYearGoalModal() {
    const modal = document.getElementById('yearGoalModal');
    if (modal) {
        document.getElementById('yearGoalTitle').value = '';
        document.getElementById('yearGoalDescription').value = '';
        document.getElementById('yearGoalCategory').value = '';
        modal.classList.add('active');
    }
}

function closeYearGoalModal() {
    document.getElementById('yearGoalModal').classList.remove('active');
}

function saveYearGoal() {
    const title = document.getElementById('yearGoalTitle').value.trim();
    const description = document.getElementById('yearGoalDescription').value.trim();
    const categoryId = document.getElementById('yearGoalCategory').value;
    
    if (!title) {
        alert('목표 제목을 입력해주세요.');
        return;
    }
    
    const userKey = `year_goals_${currentUser.email}_${currentYearViewYear}`;
    const yearGoals = JSON.parse(localStorage.getItem(userKey) || '[]');
    
    const newGoal = {
        id: Date.now(),
        title: title,
        description: description,
        categoryId: categoryId || null,
        createdAt: new Date().toISOString()
    };
    
    yearGoals.push(newGoal);
    localStorage.setItem(userKey, JSON.stringify(yearGoals));
    
    closeYearGoalModal();
    renderYearView();
    alert('연간 목표가 추가되었습니다!');
}

function deleteYearGoal(id) {
    if (!confirm('이 목표를 삭제하시겠습니까?')) return;
    
    const userKey = `year_goals_${currentUser.email}_${currentYearViewYear}`;
    let yearGoals = JSON.parse(localStorage.getItem(userKey) || '[]');
    yearGoals = yearGoals.filter(g => g.id !== id);
    localStorage.setItem(userKey, JSON.stringify(yearGoals));
    
    renderYearView();
}

// ==================== 월간 목표 ====================
function renderMonthGoalView() {
    const monthGoalsList = document.getElementById('monthGoalsList');
    const currentMonthGoalEl = document.getElementById('currentMonthGoal');
    
    if (currentMonthGoalEl) {
        currentMonthGoalEl.textContent = `${currentMonthGoalYear}년 ${currentMonthGoalMonth + 1}월`;
    }
    
    if (!monthGoalsList) return;
    
    monthGoalsList.innerHTML = '';
    
    const userKey = `month_goals_${currentUser.email}_${currentMonthGoalYear}_${currentMonthGoalMonth}`;
    const monthGoals = JSON.parse(localStorage.getItem(userKey) || '[]');
    
    if (monthGoals.length === 0) {
        monthGoalsList.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🎯</div><div class="empty-state-text">이번 달 목표가 없습니다.</div></div>';
        return;
    }
    
    monthGoals.forEach(goal => {
        const achievementKey = `month_goal_achievements_${currentUser.email}_${goal.id}`;
        const achievements = JSON.parse(localStorage.getItem(achievementKey) || '[]');
        
        const daysInMonth = new Date(currentMonthGoalYear, currentMonthGoalMonth + 1, 0).getDate();
        const achievedDays = achievements.length;
        const achievementRate = Math.round((achievedDays / daysInMonth) * 100);
        
        const card = document.createElement('div');
        card.className = 'month-goal-card';
        
        card.innerHTML = `
            <div class="month-goal-emoji">${goal.emoji}</div>
            <div class="month-goal-title">${goal.title}</div>
            <div class="month-goal-description">${goal.description}</div>
            <div class="month-goal-stats">
                <div class="month-goal-stat">
                    <span class="month-goal-stat-value">${achievedDays}</span>
                    <span class="month-goal-stat-label">달성일</span>
                </div>
                <div class="month-goal-stat">
                    <span class="month-goal-stat-value">${achievementRate}%</span>
                    <span class="month-goal-stat-label">달성률</span>
                </div>
            </div>
            <div class="month-goal-actions">
                <button class="btn-primary" onclick="openMonthGoalCalendar(${goal.id}, '${goal.title}', '${goal.emoji}')">달력 보기</button>
                <button class="btn-delete-small" onclick="deleteMonthGoal(${goal.id})">삭제</button>
            </div>
        `;
        
        monthGoalsList.appendChild(card);
    });
}

function openMonthGoalModal() {
    const modal = document.getElementById('monthGoalModal');
    if (modal) {
        document.getElementById('monthGoalTitle').value = '';
        document.getElementById('monthGoalDescription').value = '';
        selectedMonthGoalEmoji = '🎯';
        document.getElementById('monthGoalEmoji').value = '🎯';
        
        document.querySelectorAll('#monthGoalEmojiSelector .emoji-btn').forEach(btn => {
            btn.classList.remove('selected');
            if (btn.dataset.emoji === '🎯') {
                btn.classList.add('selected');
            }
        });
        
        modal.classList.add('active');
    }
}

function closeMonthGoalModal() {
    document.getElementById('monthGoalModal').classList.remove('active');
}

function saveMonthGoal() {
    const title = document.getElementById('monthGoalTitle').value.trim();
    const description = document.getElementById('monthGoalDescription').value.trim();
    const emoji = selectedMonthGoalEmoji;
    
    if (!title) {
        alert('목표 제목을 입력해주세요.');
        return;
    }
    
    const userKey = `month_goals_${currentUser.email}_${currentMonthGoalYear}_${currentMonthGoalMonth}`;
    const monthGoals = JSON.parse(localStorage.getItem(userKey) || '[]');
    
    const newGoal = {
        id: Date.now(),
        title: title,
        description: description,
        emoji: emoji,
        createdAt: new Date().toISOString()
    };
    
    monthGoals.push(newGoal);
    localStorage.setItem(userKey, JSON.stringify(monthGoals));
    
    closeMonthGoalModal();
    renderMonthGoalView();
    alert('월간 목표가 추가되었습니다!');
}

function deleteMonthGoal(id) {
    if (!confirm('이 목표를 삭제하시겠습니까?')) return;
    
    const userKey = `month_goals_${currentUser.email}_${currentMonthGoalYear}_${currentMonthGoalMonth}`;
    let monthGoals = JSON.parse(localStorage.getItem(userKey) || '[]');
    monthGoals = monthGoals.filter(g => g.id !== id);
    localStorage.setItem(userKey, JSON.stringify(monthGoals));
    
    // 달성 기록도 삭제
    const achievementKey = `month_goal_achievements_${currentUser.email}_${id}`;
    localStorage.removeItem(achievementKey);
    
    renderMonthGoalView();
}

function openMonthGoalCalendar(goalId, goalTitle, goalEmoji) {
    const modal = document.getElementById('monthGoalCalendarModal');
    if (!modal) return;
    
    const title = document.getElementById('monthGoalCalendarTitle');
    const content = document.getElementById('monthGoalCalendarContent');
    
    title.textContent = `${goalEmoji} ${goalTitle}`;
    
    content.innerHTML = '';
    
    // 달력 헤더
    const header = document.createElement('div');
    header.style.cssText = 'text-align: center; font-size: 1.3em; font-weight: 700; margin-bottom: 20px; color: #424242;';
    header.textContent = `${currentMonthGoalYear}년 ${currentMonthGoalMonth + 1}월`;
    content.appendChild(header);
    
    // 요일 헤더
    const calendarGrid = document.createElement('div');
    calendarGrid.className = 'month-goal-calendar-grid';
    
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    weekdays.forEach(day => {
        const weekdayEl = document.createElement('div');
        weekdayEl.className = 'month-goal-calendar-weekday';
        weekdayEl.textContent = day;
        calendarGrid.appendChild(weekdayEl);
    });
    
    const achievementKey = `month_goal_achievements_${currentUser.email}_${goalId}`;
    const achievements = JSON.parse(localStorage.getItem(achievementKey) || '[]');
    
    const firstDay = new Date(currentMonthGoalYear, currentMonthGoalMonth, 1);
    const lastDay = new Date(currentMonthGoalYear, currentMonthGoalMonth + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const lastDate = lastDay.getDate();
    
    // 빈 칸
    for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyEl = document.createElement('div');
        calendarGrid.appendChild(emptyEl);
    }
    
    const today = new Date();
    
    // 날짜 칸
    for (let date = 1; date <= lastDate; date++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'month-goal-calendar-day';
        
        const dateKey = `${currentMonthGoalYear}-${String(currentMonthGoalMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
        const isAchieved = achievements.includes(dateKey);
        
        if (isAchieved) {
            dayEl.classList.add('achieved');
        }
        
        const currentDate = new Date(currentMonthGoalYear, currentMonthGoalMonth, date);
        if (currentDate.toDateString() === today.toDateString()) {
            dayEl.classList.add('today');
        }
        
        const numberEl = document.createElement('div');
        numberEl.className = 'month-goal-calendar-day-number';
        numberEl.textContent = date;
        dayEl.appendChild(numberEl);
        
        if (isAchieved) {
            const emojiEl = document.createElement('div');
            emojiEl.className = 'month-goal-calendar-emoji';
            emojiEl.textContent = '✓';
            dayEl.appendChild(emojiEl);
        }
        
        dayEl.addEventListener('click', () => {
            if (isAchieved) {
                const index = achievements.indexOf(dateKey);
                achievements.splice(index, 1);
            } else {
                achievements.push(dateKey);
            }
            localStorage.setItem(achievementKey, JSON.stringify(achievements));
            openMonthGoalCalendar(goalId, goalTitle, goalEmoji);
            renderMonthGoalView();
        });
        
        calendarGrid.appendChild(dayEl);
    }
    
    content.appendChild(calendarGrid);
    modal.classList.add('active');
}

function closeMonthGoalCalendarModal() {
    document.getElementById('monthGoalCalendarModal')?.classList.remove('active');
}

// ==================== 통계 ====================
function renderStats() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    // 이번 달의 모든 할 일 계산
    let totalTodos = 0;
    let completedTodos = 0;
    const categoryStats = {};
    const dailyStats = {};
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const todos = getTodos(dateKey);
        const schedules = getSchedules(dateKey);
        
        totalTodos += todos.length;
        completedTodos += todos.filter(t => t.completed).length;
        
        dailyStats[day] = todos.filter(t => t.completed).length;
        
        // 카테고리별 통계
        [...todos, ...schedules].forEach(item => {
            const catId = item.categoryId || 'none';
            if (!categoryStats[catId]) {
                categoryStats[catId] = { count: 0, time: 0 };
            }
            categoryStats[catId].count++;
            
            if (item.startTime !== undefined) {
                categoryStats[catId].time += (item.endTime - item.startTime);
            }
        });
    }
    
    const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;
    
    // 요약 통계
    document.getElementById('totalTodos').textContent = totalTodos;
    document.getElementById('completedTodos').textContent = completedTodos;
    document.getElementById('completionRate').textContent = completionRate + '%';
    
    // 카테고리별 통계
    const categoryStatsEl = document.getElementById('categoryStats');
    if (categoryStatsEl) {
        categoryStatsEl.innerHTML = '';
        
        Object.keys(categoryStats).forEach(catId => {
            let categoryName = '카테고리 없음';
            let categoryColor = '#BDBDBD';
            
            if (catId !== 'none') {
                const category = categories.find(c => c.id == catId);
                if (category) {
                    categoryName = category.name;
                    categoryColor = category.color;
                }
            }
            
            const item = document.createElement('div');
            item.className = 'category-stat-item';
            item.innerHTML = `
                <div class="category-stat-color" style="background: ${categoryColor};"></div>
                <div class="category-stat-info">
                    <div class="category-stat-name">${categoryName}</div>
                    <div class="category-stat-count">${categoryStats[catId].count}개 항목</div>
                </div>
                <div class="category-stat-value">${categoryStats[catId].count}</div>
            `;
            categoryStatsEl.appendChild(item);
        });
    }
    
    // 일별 완료 현황
    const dailyChartEl = document.getElementById('dailyChart');
    if (dailyChartEl) {
        dailyChartEl.innerHTML = '';
        
        const maxValue = Math.max(...Object.values(dailyStats), 1);
        
        for (let day = 1; day <= daysInMonth; day++) {
            const value = dailyStats[day] || 0;
            const height = (value / maxValue) * 100;
            
            const bar = document.createElement('div');
            bar.className = 'daily-bar';
            bar.style.height = height + '%';
            bar.title = `${day}일: ${value}개 완료`;
            
            const label = document.createElement('div');
            label.className = 'daily-bar-label';
            label.textContent = day;
            
            const valueLabel = document.createElement('div');
            valueLabel.className = 'daily-bar-value';
            valueLabel.textContent = value;
            
            bar.appendChild(label);
            bar.appendChild(valueLabel);
            
            dailyChartEl.appendChild(bar);
        }
    }
    
    // 카테고리별 시간 사용
    const timeChartEl = document.getElementById('timeChart');
    if (timeChartEl) {
        timeChartEl.innerHTML = '';
        
        const maxTime = Math.max(...Object.values(categoryStats).map(s => s.time), 1);
        
        Object.keys(categoryStats).forEach(catId => {
            if (categoryStats[catId].time === 0) return;
            
            let categoryName = '카테고리 없음';
            let categoryColor = '#BDBDBD';
            
            if (catId !== 'none') {
                const category = categories.find(c => c.id == catId);
                if (category) {
                    categoryName = category.name;
                    categoryColor = category.color;
                }
            }
            
            const time = categoryStats[catId].time;
            const hours = Math.floor(time);
            const minutes = Math.round((time % 1) * 60);
            const percentage = (time / maxTime) * 100;
            
            const container = document.createElement('div');
            container.className = 'time-bar-container';
            
            const label = document.createElement('div');
            label.className = 'time-bar-label';
            label.textContent = categoryName;
            
            const wrapper = document.createElement('div');
            wrapper.className = 'time-bar-wrapper';
            
            const fill = document.createElement('div');
            fill.className = 'time-bar-fill';
            fill.style.width = percentage + '%';
            fill.style.background = categoryColor;
            
            const value = document.createElement('span');
            value.className = 'time-bar-value';
            value.textContent = `${hours}h ${minutes}m`;
            
            fill.appendChild(value);
            wrapper.appendChild(fill);
            container.appendChild(label);
            container.appendChild(wrapper);
            
            timeChartEl.appendChild(container);
        });
    }
}

// ==================== 메모 ====================
function loadMemos() {
    const memoList = document.getElementById('memoList');
    if (!memoList) return;
    
    memoList.innerHTML = '';
    
    const allMemos = [];
    const userKeyPrefix = `memos_${currentUser.email}_`;
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(userKeyPrefix)) {
            const dateKey = key.replace(userKeyPrefix, '');
            const memos = JSON.parse(localStorage.getItem(key) || '[]');
            memos.forEach(memo => {
                allMemos.push({ ...memo, dateKey });
            });
        }
    }
    
    if (allMemos.length === 0) {
        memoList.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📝</div><div class="empty-state-text">메모가 없습니다.</div></div>';
        return;
    }
    
    allMemos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    allMemos.forEach(memo => {
        const card = document.createElement('div');
        card.className = 'memo-card';
        
        const text = document.createElement('div');
        text.className = 'memo-card-text';
        text.textContent = memo.text;
        card.appendChild(text);
        
        if (memo.images && memo.images.length > 0) {
            const imagesDiv = document.createElement('div');
            imagesDiv.className = 'memo-card-images';
            
            memo.images.slice(0, 3).forEach(img => {
                const imgEl = document.createElement('img');
                imgEl.src = img;
                imgEl.alt = 'Memo image';
                imagesDiv.appendChild(imgEl);
            });
            
            if (memo.images.length > 3) {
                const more = document.createElement('div');
                more.className = 'memo-card-more';
                more.textContent = `+${memo.images.length - 3}`;
                imagesDiv.appendChild(more);
            }
            
            card.appendChild(imagesDiv);
        }
        
        const dateEl = document.createElement('div');
        dateEl.style.cssText = 'color: #757575; font-size: 0.9em; margin-top: 12px;';
        dateEl.textContent = memo.dateKey;
        card.appendChild(dateEl);
        
        const actions = document.createElement('div');
        actions.className = 'memo-card-actions';
        actions.innerHTML = `
            <button class="btn-delete-small" onclick="deleteMemo('${memo.id}', '${memo.dateKey}')">삭제</button>
        `;
        card.appendChild(actions);
        
        memoList.appendChild(card);
    });
}

function openMemoModal() {
    const modal = document.getElementById('memoModal');
    if (modal) {
        document.getElementById('memoModalText').value = '';
        document.getElementById('memoModalImages').innerHTML = '';
        modal.classList.add('active');
    }
}

function closeMemoModal() {
    document.getElementById('memoModal').classList.remove('active');
}

function handleMemoImageUpload(e) {
    const files = e.target.files;
    const imagesDiv = document.getElementById('memoModalImages');
    
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const item = document.createElement('div');
            item.className = 'memo-image-item';
            
            const img = document.createElement('img');
            img.src = event.target.result;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'memo-image-delete';
            deleteBtn.textContent = '✕';
            deleteBtn.onclick = () => item.remove();
            
            item.appendChild(img);
            item.appendChild(deleteBtn);
            imagesDiv.appendChild(item);
        };
        reader.readAsDataURL(file);
    });
}

function saveMemoModal() {
    const text = document.getElementById('memoModalText').value.trim();
    
    if (!text) {
        alert('메모 내용을 입력해주세요.');
        return;
    }
    
    const dateKey = getDateKey(selectedDate);
    const userKey = `memos_${currentUser.email}_${dateKey}`;
    const memos = JSON.parse(localStorage.getItem(userKey) || '[]');
    
    const images = [];
    document.querySelectorAll('#memoModalImages img').forEach(img => {
        images.push(img.src);
    });
    
    const newMemo = {
        id: Date.now(),
        text: text,
        images: images,
        createdAt: new Date().toISOString(),
        dateKey: dateKey
    };
    
    memos.push(newMemo);
    localStorage.setItem(userKey, JSON.stringify(memos));
    
    closeMemoModal();
    loadMemos();
    alert('메모가 저장되었습니다!');
}

function deleteMemo(id, dateKey) {
    if (!confirm('이 메모를 삭제하시겠습니까?')) return;
    
    const userKey = `memos_${currentUser.email}_${dateKey}`;
    let memos = JSON.parse(localStorage.getItem(userKey) || '[]');
    memos = memos.filter(m => m.id != id);
    localStorage.setItem(userKey, JSON.stringify(memos));
    
    loadMemos();
}

// ==================== 일기 ====================
function loadDiaries() {
    const diaryList = document.getElementById('diaryList');
    if (!diaryList) return;
    
    diaryList.innerHTML = '';
    
    const userKey = `diaries_${currentUser.email}`;
    const diaries = JSON.parse(localStorage.getItem(userKey) || '[]');
    
    if (diaries.length === 0) {
        diaryList.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📖</div><div class="empty-state-text">일기가 없습니다.</div></div>';
        return;
    }
    
    diaries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    diaries.forEach(diary => {
        const card = document.createElement('div');
        card.className = 'diary-card';
        
        card.innerHTML = `
            <div class="diary-card-header">
                <div class="diary-card-title">${diary.title}</div>
                <div class="diary-card-mood">${diary.mood}</div>
            </div>
            <div class="diary-card-date">${new Date(diary.createdAt).toLocaleDateString('ko-KR')}</div>
            <div class="diary-card-preview">${diary.content}</div>
            <div class="diary-card-actions">
                <button class="btn-delete-small" onclick="deleteDiary('${diary.id}')">삭제</button>
            </div>
        `;
        
        diaryList.appendChild(card);
    });
}

function openDiaryModal() {
    const modal = document.getElementById('diaryModal');
    if (modal) {
        document.getElementById('diaryTitle').value = '';
        document.getElementById('diaryContent').value = '';
        document.getElementById('diaryMood').value = '😊';
        
        document.querySelectorAll('.mood-btn').forEach(btn => {
            btn.classList.remove('selected');
            if (btn.dataset.mood === '😊') {
                btn.classList.add('selected');
            }
        });
        
        modal.classList.add('active');
    }
}

function closeDiaryModal() {
    document.getElementById('diaryModal').classList.remove('active');
}

function selectMood(mood) {
    document.getElementById('diaryMood').value = mood;
    document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.classList.remove('selected');
        if (btn.dataset.mood === mood) {
            btn.classList.add('selected');
        }
    });
}

function saveDiary() {
    const title = document.getElementById('diaryTitle').value.trim();
    const content = document.getElementById('diaryContent').value.trim();
    const mood = document.getElementById('diaryMood').value;
    
    if (!title || !content) {
        alert('제목과 내용을 입력해주세요.');
        return;
    }
    
    const userKey = `diaries_${currentUser.email}`;
    const diaries = JSON.parse(localStorage.getItem(userKey) || '[]');
    
    const newDiary = {
        id: Date.now(),
        title: title,
        content: content,
        mood: mood,
        createdAt: new Date().toISOString()
    };
    
    diaries.push(newDiary);
    localStorage.setItem(userKey, JSON.stringify(diaries));
    
    closeDiaryModal();
    loadDiaries();
    alert('일기가 저장되었습니다!');
}

function deleteDiary(id) {
    if (!confirm('이 일기를 삭제하시겠습니까?')) return;
    
    const userKey = `diaries_${currentUser.email}`;
    let diaries = JSON.parse(localStorage.getItem(userKey) || '[]');
    diaries = diaries.filter(d => d.id != id);
    localStorage.setItem(userKey, JSON.stringify(diaries));
    
    loadDiaries();
}

// ==================== 타임캡슐 ====================
function loadTimecapsules() {
    const timecapsuleList = document.getElementById('timecapsuleList');
    if (!timecapsuleList) return;
    
    timecapsuleList.innerHTML = '';
    
    const userKey = `timecapsules_${currentUser.email}`;
    const timecapsules = JSON.parse(localStorage.getItem(userKey) || '[]');
    
    if (timecapsules.length === 0) {
        timecapsuleList.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🎁</div><div class="empty-state-text">타임캡슐이 없습니다.</div></div>';
        return;
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    timecapsules.forEach(capsule => {
        const openDate = new Date(capsule.openDate);
        openDate.setHours(0, 0, 0, 0);
        const isUnlocked = openDate <= today;
        
        const card = document.createElement('div');
        card.className = `timecapsule-card ${isUnlocked ? 'unlocked' : 'locked'}`;
        
        if (isUnlocked) {
            card.innerHTML = `
                <div class="timecapsule-title">${capsule.title}</div>
                <div class="timecapsule-date">열람 가능</div>
                <div class="timecapsule-status">"${capsule.message}"</div>
                <div class="timecapsule-actions">
                    <button class="btn-delete-small" onclick="deleteTimecapsule('${capsule.id}')">삭제</button>
                </div>
            `;
        } else {
            const daysLeft = Math.ceil((openDate - today) / (1000 * 60 * 60 * 24));
            card.innerHTML = `
                <div class="timecapsule-title">${capsule.title}</div>
                <div class="timecapsule-date">${capsule.openDate}</div>
                <div class="timecapsule-status">🔒 D-${daysLeft}일 후 열림</div>
                <div class="timecapsule-actions">
                    <button class="btn-delete-small" onclick="deleteTimecapsule('${capsule.id}')">삭제</button>
                </div>
            `;
        }
        
        timecapsuleList.appendChild(card);
    });
}

function openTimecapsuleModal() {
    const modal = document.getElementById('timecapsuleModal');
    if (modal) {
        document.getElementById('timecapsuleTitle').value = '';
        document.getElementById('timecapsuleMessage').value = '';
        document.getElementById('timecapsuleDate').value = '';
        modal.classList.add('active');
    }
}

function closeTimecapsuleModal() {
    document.getElementById('timecapsuleModal').classList.remove('active');
}

function saveTimecapsule() {
    const title = document.getElementById('timecapsuleTitle').value.trim();
    const message = document.getElementById('timecapsuleMessage').value.trim();
    const openDate = document.getElementById('timecapsuleDate').value;
    
    if (!title || !message || !openDate) {
        alert('모든 항목을 입력해주세요.');
        return;
    }
    
    const userKey = `timecapsules_${currentUser.email}`;
    const timecapsules = JSON.parse(localStorage.getItem(userKey) || '[]');
    
    const newCapsule = {
        id: Date.now(),
        title: title,
        message: message,
        openDate: openDate,
        createdAt: new Date().toISOString()
    };
    
    timecapsules.push(newCapsule);
    localStorage.setItem(userKey, JSON.stringify(timecapsules));
    
    closeTimecapsuleModal();
    loadTimecapsules();
    alert('타임캡슐이 봉인되었습니다!');
}

function deleteTimecapsule(id) {
    if (!confirm('이 타임캡슐을 삭제하시겠습니까?')) return;
    
    const userKey = `timecapsules_${currentUser.email}`;
    let timecapsules = JSON.parse(localStorage.getItem(userKey) || '[]');
    timecapsules = timecapsules.filter(t => t.id != id);
    localStorage.setItem(userKey, JSON.stringify(timecapsules));
    
    loadTimecapsules();
}

// ==================== D-Day ====================
function loadDdayView() {
    const ddayList = document.getElementById('ddayList');
    if (!ddayList) return;
    
    ddayList.innerHTML = '';
    
    const userKey = `ddays_${currentUser.email}`;
    const ddays = JSON.parse(localStorage.getItem(userKey) || '[]');
    
    if (ddays.length === 0) {
        ddayList.innerHTML = '<div class="empty-state"><div class="empty-state-icon">⏰</div><div class="empty-state-text">D-Day가 없습니다.</div></div>';
        return;
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    ddays.forEach(dday => {
        const targetDate = new Date(dday.date);
        targetDate.setHours(0, 0, 0, 0);
        
        const diffTime = targetDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        const card = document.createElement('div');
        card.className = 'dday-card';
        
        let counterText;
        let counterClass = '';
        
        if (diffDays > 0) {
            counterText = `D-${diffDays}`;
        } else if (diffDays === 0) {
            counterText = 'D-Day';
        } else {
            counterText = `D+${Math.abs(diffDays)}`;
            counterClass = 'passed';
        }
        
        card.innerHTML = `
            <div class="dday-emoji">${dday.emoji}</div>
            <div class="dday-title">${dday.title}</div>
            <div class="dday-counter ${counterClass}">${counterText}</div>
            <div class="dday-date">${dday.date}</div>
            <div class="dday-actions">
                <button class="btn-delete-small" onclick="deleteDday(${dday.id})">삭제</button>
            </div>
        `;
        
        ddayList.appendChild(card);
    });
}

function openDdayModal() {
    const modal = document.getElementById('ddayModal');
    if (modal) {
        document.getElementById('ddayTitle').value = '';
        document.getElementById('ddayDate').value = '';
        selectedDdayEmoji = '🎂';
        document.getElementById('ddayEmoji').value = '🎂';
        
        document.querySelectorAll('#ddayEmojiSelector .emoji-btn').forEach(btn => {
            btn.classList.remove('selected');
            if (btn.dataset.emoji === '🎂') {
                btn.classList.add('selected');
            }
        });
        
        modal.classList.add('active');
    }
}

function closeDdayModal() {
    document.getElementById('ddayModal').classList.remove('active');
}

function saveDday() {
    const title = document.getElementById('ddayTitle').value.trim();
    const date = document.getElementById('ddayDate').value;
    const emoji = selectedDdayEmoji;
    
    if (!title || !date) {
        alert('모든 항목을 입력해주세요.');
        return;
    }
    
    const userKey = `ddays_${currentUser.email}`;
    const ddays = JSON.parse(localStorage.getItem(userKey) || '[]');
    
    const newDday = {
        id: Date.now(),
        title: title,
        date: date,
        emoji: emoji,
        createdAt: new Date().toISOString()
    };
    
    ddays.push(newDday);
    localStorage.setItem(userKey, JSON.stringify(ddays));
    
    closeDdayModal();
    loadDdayView();
    alert('D-Day가 추가되었습니다!');
}

function deleteDday(id) {
    if (!confirm('이 D-Day를 삭제하시겠습니까?')) return;
    
    const userKey = `ddays_${currentUser.email}`;
    let ddays = JSON.parse(localStorage.getItem(userKey) || '[]');
    ddays = ddays.filter(d => d.id !== id);
    localStorage.setItem(userKey, JSON.stringify(ddays));
    
    loadDdayView();
}

// ==================== 타이머 ====================
function setTimer(minutes) {
    timerMinutes = minutes;
    timerSeconds = 0;
    updateTimerDisplay();
}

function startTimer() {
    if (timerRunning) return;
    
    timerRunning = true;
    document.getElementById('timerStart').style.display = 'none';
    document.getElementById('timerPause').style.display = 'inline-block';
    
    timerInterval = setInterval(() => {
        if (timerSeconds === 0) {
            if (timerMinutes === 0) {
                clearInterval(timerInterval);
                timerRunning = false;
                document.getElementById('timerStart').style.display = 'inline-block';
                document.getElementById('timerPause').style.display = 'none';
                alert('⏰ 타이머가 종료되었습니다!');
                return;
            }
            timerMinutes--;
            timerSeconds = 59;
        } else {
            timerSeconds--;
        }
        updateTimerDisplay();
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    document.getElementById('timerStart').style.display = 'inline-block';
    document.getElementById('timerPause').style.display = 'none';
}

function resetTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    timerMinutes = 25;
    timerSeconds = 0;
    updateTimerDisplay();
    document.getElementById('timerStart').style.display = 'inline-block';
    document.getElementById('timerPause').style.display = 'none';
}

function updateTimerDisplay() {
    document.getElementById('timerMinutes').textContent = String(timerMinutes).padStart(2, '0');
    document.getElementById('timerSeconds').textContent = String(timerSeconds).padStart(2, '0');
}

// ==================== 스톱워치 ====================
function startStopwatch() {
    if (stopwatchRunning) return;
    
    stopwatchRunning = true;
    document.getElementById('stopwatchStart').style.display = 'none';
    document.getElementById('stopwatchPause').style.display = 'inline-block';
    document.getElementById('stopwatchLap').style.display = 'inline-block';
    
    const startTime = Date.now() - stopwatchTime;
    
    stopwatchInterval = setInterval(() => {
        stopwatchTime = Date.now() - startTime;
        updateStopwatchDisplay();
    }, 10);
}

function pauseStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    document.getElementById('stopwatchStart').style.display = 'inline-block';
    document.getElementById('stopwatchPause').style.display = 'none';
    document.getElementById('stopwatchLap').style.display = 'none';
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    stopwatchTime = 0;
    laps = [];
    updateStopwatchDisplay();
    document.getElementById('lapsList').innerHTML = '';
    document.getElementById('stopwatchStart').style.display = 'inline-block';
    document.getElementById('stopwatchPause').style.display = 'none';
    document.getElementById('stopwatchLap').style.display = 'none';
}

function recordLap() {
    if (!stopwatchRunning) return;
    
    laps.push(stopwatchTime);
    
    const lapsList = document.getElementById('lapsList');
    const lapItem = document.createElement('div');
    lapItem.className = 'lap-item';
    
    const hours = Math.floor(stopwatchTime / 3600000);
    const minutes = Math.floor((stopwatchTime % 3600000) / 60000);
    const seconds = Math.floor((stopwatchTime % 60000) / 1000);
    const milliseconds = Math.floor((stopwatchTime % 1000) / 10);
    
    lapItem.innerHTML = `
        <span class="lap-number">Lap ${laps.length}</span>
        <span class="lap-time">${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}</span>
    `;
    
    lapsList.insertBefore(lapItem, lapsList.firstChild);
}

function updateStopwatchDisplay() {
    const hours = Math.floor(stopwatchTime / 3600000);
    const minutes = Math.floor((stopwatchTime % 3600000) / 60000);
    const seconds = Math.floor((stopwatchTime % 60000) / 1000);
    
    document.getElementById('stopwatchTime').textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// ==================== 알람 ====================
function loadAlarms() {
    const alarmList = document.getElementById('alarmList');
    if (!alarmList) return;
    
    alarmList.innerHTML = '';
    
    const userKey = `alarms_${currentUser.email}`;
    const alarms = JSON.parse(localStorage.getItem(userKey) || '[]');
    
    if (alarms.length === 0) {
        alarmList.innerHTML = '<div class="empty-state"><div class="empty-state-icon">⏰</div><div class="empty-state-text">알람이 없습니다.</div></div>';
        return;
    }
    
    alarms.forEach(alarm => {
        const item = document.createElement('div');
        item.className = 'alarm-item';
        
        const days = alarm.days || [];
        const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
        const dayText = days.length === 7 ? '매일' : 
                       days.length === 0 ? '한 번' : 
                       days.map(d => dayNames[d]).join(', ');
        
        item.innerHTML = `
            <div class="alarm-info">
                <div class="alarm-time">${alarm.time}</div>
                <div class="alarm-title">${alarm.title}</div>
                <div class="alarm-days">${dayText}</div>
            </div>
            <button class="alarm-toggle ${alarm.active ? 'active' : ''}" onclick="toggleAlarm(${alarm.id})"></button>
            <button class="alarm-delete" onclick="deleteAlarm(${alarm.id})">삭제</button>
        `;
        
        alarmList.appendChild(item);
    });
}

function openAlarmModal() {
    const modal = document.getElementById('alarmModal');
    if (modal) {
        document.getElementById('alarmTitle').value = '';
        document.getElementById('alarmTime').value = '07:00';
        document.getElementById('alarmSound').value = 'default';
        document.querySelectorAll('input[name="alarmDay"]').forEach(cb => cb.checked = false);
        modal.classList.add('active');
    }
}

function closeAlarmModal() {
    document.getElementById('alarmModal').classList.remove('active');
}

function saveAlarm() {
    const title = document.getElementById('alarmTitle').value.trim();
    const time = document.getElementById('alarmTime').value;
    const sound = document.getElementById('alarmSound').value;
    
    const days = [];
    document.querySelectorAll('input[name="alarmDay"]:checked').forEach(cb => {
        days.push(parseInt(cb.value));
    });
    
    if (!title || !time) {
        alert('알람 이름과 시간을 입력해주세요.');
        return;
    }
    
    const userKey = `alarms_${currentUser.email}`;
    const alarms = JSON.parse(localStorage.getItem(userKey) || '[]');
    
    const newAlarm = {
        id: Date.now(),
        title: title,
        time: time,
        sound: sound,
        days: days,
        active: true,
        createdAt: new Date().toISOString()
    };
    
    alarms.push(newAlarm);
    localStorage.setItem(userKey, JSON.stringify(alarms));
    
    closeAlarmModal();
    loadAlarms();
    alert('알람이 추가되었습니다!');
}

function toggleAlarm(id) {
    const userKey = `alarms_${currentUser.email}`;
    const alarms = JSON.parse(localStorage.getItem(userKey) || '[]');
    
    const alarm = alarms.find(a => a.id === id);
    if (alarm) {
        alarm.active = !alarm.active;
        localStorage.setItem(userKey, JSON.stringify(alarms));
        loadAlarms();
    }
}

function deleteAlarm(id) {
    if (!confirm('이 알람을 삭제하시겠습니까?')) return;
    
    const userKey = `alarms_${currentUser.email}`;
    let alarms = JSON.parse(localStorage.getItem(userKey) || '[]');
    alarms = alarms.filter(a => a.id !== id);
    localStorage.setItem(userKey, JSON.stringify(alarms));
    
    loadAlarms();
}

// ==================== 포춘쿠키 ====================
function breakCookie() {
    const cookie = document.getElementById('fortuneCookie');
    const message = document.getElementById('fortuneMessage');
    const newBtn = document.getElementById('newCookieBtn');
    
    cookie.style.display = 'none';
    
    const randomMessage = fortuneMessages[Math.floor(Math.random() * fortuneMessages.length)];
    message.textContent = randomMessage;
    message.style.display = 'block';
    newBtn.style.display = 'block';
}

function resetCookie() {
    const cookie = document.getElementById('fortuneCookie');
    const message = document.getElementById('fortuneMessage');
    const newBtn = document.getElementById('newCookieBtn');
    
    cookie.style.display = 'block';
    message.style.display = 'none';
    newBtn.style.display = 'none';
}

// ==================== 명상 ====================
function startMeditation(name, inhaleTime, exhaleTime, color) {
    const programsDiv = document.querySelector('.meditation-programs');
    const sessionDiv = document.getElementById('meditationSession');
    const circle = document.getElementById('meditationCircle');
    const instruction = document.getElementById('meditationInstruction');
    
    programsDiv.style.display = 'none';
    sessionDiv.style.display = 'block';
    
    circle.style.background = color;
    meditationPhase = 'inhale';
    
    function animate() {
        if (meditationPhase === 'inhale') {
            instruction.textContent = '천천히 숨을 들이마시세요...';
            circle.style.transform = 'scale(1.3)';
            
            setTimeout(() => {
                meditationPhase = 'exhale';
                animate();
            }, inhaleTime * 1000);
            
        } else {
            instruction.textContent = '천천히 숨을 내쉬세요...';
            circle.style.transform = 'scale(1)';
            
            setTimeout(() => {
                meditationPhase = 'inhale';
                animate();
            }, exhaleTime * 1000);
        }
    }
    
    animate();
}

function stopMeditation() {
    const programsDiv = document.querySelector('.meditation-programs');
    const sessionDiv = document.getElementById('meditationSession');
    
    sessionDiv.style.display = 'none';
    programsDiv.style.display = 'grid';
}

// ==================== 홈 페이지 ====================
if (window.location.pathname.includes('home.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const userStr = localStorage.getItem('currentUser');
        if (!userStr) {
            window.location.href = 'login.html';
            return;
        }
        
        currentUser = JSON.parse(userStr);
        
        const userNameEl = document.getElementById('userName');
        if (userNameEl) {
            userNameEl.textContent = `${currentUser.name}님`;
        }
        
        // 다크모드 설정
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            document.getElementById('darkModeToggle').textContent = '☀️';
        }
        
        document.getElementById('darkModeToggle')?.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark);
            document.getElementById('darkModeToggle').textContent = isDark ? '☀️' : '🌙';
        });
        
        document.getElementById('logoutBtn')?.addEventListener('click', () => {
            if (confirm('로그아웃 하시겠습니까?')) {
                localStorage.removeItem('currentUser');
                window.location.href = 'login.html';
            }
        });
        
        // 메뉴 카드 클릭 이벤트
        document.querySelectorAll('.menu-card').forEach(card => {
            card.addEventListener('click', () => {
                const view = card.dataset.view;
                localStorage.setItem('initialView', view);
                window.location.href = 'index.html';
            });
        });
        
        // 날씨 로드
        loadWeather();
        
        // 날씨 위젯 클릭 시 위치 변경 모달
        document.getElementById('weatherWidget')?.addEventListener('click', () => {
            const modal = document.getElementById('locationModal');
            if (modal) {
                modal.classList.add('active');
            }
        });
        
        document.getElementById('saveLocationBtn')?.addEventListener('click', () => {
            const city = document.getElementById('cityInput').value.trim();
            if (city) {
                localStorage.setItem('weatherCity', city);
                loadWeather();
                document.getElementById('locationModal').classList.remove('active');
            }
        });
        
        document.getElementById('closeLocationModal')?.addEventListener('click', () => {
            document.getElementById('locationModal').classList.remove('active');
        });
    });
}

// ==================== 날씨 API ====================
async function loadWeather() {
    const city = localStorage.getItem('weatherCity') || 'Seoul';
    const apiKey = WEATHER_API_KEY;
    
    if (!apiKey || apiKey === 'YOUR_OPENWEATHER_API_KEY') {
        document.getElementById('weatherCity').textContent = city;
        document.getElementById('weatherTemp').textContent = '--°C';
        document.getElementById('weatherIcon').textContent = '🌤️';
        return;
    }
    
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kr`
        );
        
        if (!response.ok) {
            throw new Error('날씨 API 호출 실패');
        }
        
        const data = await response.json();
        
        const temp = Math.round(data.main.temp);
        const weatherMain = data.weather[0].main;
        
        const weatherIcons = {
            'Clear': '☀️',
            'Clouds': '☁️',
            'Rain': '🌧️',
            'Drizzle': '🌦️',
            'Thunderstorm': '⛈️',
            'Snow': '❄️',
            'Mist': '🌫️',
            'Fog': '🌫️'
        };
        
        document.getElementById('weatherCity').textContent = city;
        document.getElementById('weatherTemp').textContent = `${temp}°C`;
        document.getElementById('weatherIcon').textContent = weatherIcons[weatherMain] || '🌤️';
        
    } catch (error) {
        console.error('날씨 로드 실패:', error);
        document.getElementById('weatherCity').textContent = city;
        document.getElementById('weatherTemp').textContent = '--°C';
        document.getElementById('weatherIcon').textContent = '🌤️';
    }
}

// ==================== 전역 윈도우 함수 노출 ====================
window.deleteMemo = deleteMemo;
window.deleteDiary = deleteDiary;
window.deleteTimecapsule = deleteTimecapsule;
window.deleteTodo = deleteTodo;
window.deleteSchedule = deleteSchedule;
window.editSchedule = editSchedule;
window.updateScheduleCompletion = updateScheduleCompletion;
window.updateTodoCompletion = updateTodoCompletion;
window.openMonthGoalCalendar = openMonthGoalCalendar;
window.showDayStats = showDayStats;

console.log('Tweedule 앱이 로드되었습니다!');
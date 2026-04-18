class LearningHub {
    constructor() {
        this.storageKey = 'calcify-learning-hub';
        this.state = {
            goal: '',
            notes: '',
            tasks: [],
            streak: 0,
            correctAnswers: 0,
            totalAnswers: 0,
            focusSessions: 0,
            timerMinutes: 25,
            lastFormulaCategory: 'geometry'
        };

        this.currentQuestion = null;
        this.timerInterval = null;
        this.remainingSeconds = 25 * 60;
        this.formulaPool = [];

        this.init();
    }

    init() {
        if (!document.getElementById('learning-calculator')) return;
        this.loadState();
        this.buildFormulaPool();
        this.bindEvents();
        this.renderAll();
        this.generateQuestion();
        this.showFormulaSpotlight();
    }

    bindEvents() {
        this.bindClick('learning-save-goal', () => this.saveGoal());
        this.bindClick('learning-timer-start', () => this.startTimer());
        this.bindClick('learning-timer-pause', () => this.pauseTimer());
        this.bindClick('learning-timer-reset', () => this.resetTimer());
        this.bindClick('learning-submit-answer', () => this.submitAnswer());
        this.bindClick('learning-new-question', () => this.generateQuestion());
        this.bindClick('learning-next-formula', () => this.showFormulaSpotlight(true));
        this.bindClick('learning-open-formulas', () => this.openFormulaLibrary());
        this.bindClick('learning-add-task', () => this.addTask());
        this.bindClick('learning-save-notes', () => this.saveNotes());
        this.bindClick('learning-export-notes', () => this.exportNotes());

        const timerMode = document.getElementById('learning-timer-mode');
        if (timerMode) {
            timerMode.addEventListener('change', (e) => {
                this.state.timerMinutes = parseInt(e.target.value, 10);
                this.remainingSeconds = this.state.timerMinutes * 60;
                this.updateTimerDisplay();
                this.persist();
            });
        }

        const answerInput = document.getElementById('learning-answer');
        if (answerInput) {
            answerInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.submitAnswer();
                }
            });
        }

        const taskInput = document.getElementById('learning-task-input');
        if (taskInput) {
            taskInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.addTask();
                }
            });
        }
    }

    bindClick(id, handler) {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', handler);
    }

    saveGoal() {
        const input = document.getElementById('learning-goal-input');
        if (!input) return;
        this.state.goal = input.value.trim();
        this.persist();
        this.renderGoal();
        this.notify('Goal saved', 'success');
    }

    startTimer() {
        if (this.timerInterval) return;
        this.timerInterval = setInterval(() => {
            if (this.remainingSeconds <= 0) {
                this.pauseTimer();
                this.state.focusSessions += 1;
                this.state.streak += 1;
                this.persist();
                this.renderStats();
                this.notify('Focus session completed', 'success');
                return;
            }
            this.remainingSeconds -= 1;
            this.updateTimerDisplay();
        }, 1000);
    }

    pauseTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    resetTimer() {
        this.pauseTimer();
        this.remainingSeconds = this.state.timerMinutes * 60;
        this.updateTimerDisplay();
    }

    updateTimerDisplay() {
        const display = document.getElementById('learning-timer-display');
        if (!display) return;
        const min = Math.floor(this.remainingSeconds / 60).toString().padStart(2, '0');
        const sec = (this.remainingSeconds % 60).toString().padStart(2, '0');
        display.textContent = `${min}:${sec}`;
    }

    generateQuestion() {
        const typeEl = document.getElementById('learning-practice-type');
        const type = typeEl ? typeEl.value : 'arithmetic';

        this.currentQuestion = this.createQuestion(type);

        const questionEl = document.getElementById('learning-question');
        const feedbackEl = document.getElementById('learning-feedback');
        const answerEl = document.getElementById('learning-answer');

        if (questionEl) questionEl.textContent = this.currentQuestion.prompt;
        if (feedbackEl) feedbackEl.textContent = '';
        if (answerEl) {
            answerEl.value = '';
            answerEl.focus();
        }
    }

    createQuestion(type) {
        if (type === 'algebra') {
            const x = this.rand(2, 12);
            const m = this.rand(2, 9);
            const b = this.rand(3, 30);
            const rhs = (m * x) + b;
            return {
                prompt: `Solve for x: ${m}x + ${b} = ${rhs}`,
                answer: x
            };
        }

        if (type === 'percentage') {
            const base = this.rand(40, 800);
            const percent = this.rand(5, 40);
            const answer = (base * percent) / 100;
            return {
                prompt: `What is ${percent}% of ${base}?`,
                answer
            };
        }

        if (type === 'unit') {
            const km = this.rand(2, 40);
            return {
                prompt: `Convert ${km} km to meters`,
                answer: km * 1000
            };
        }

        const a = this.rand(20, 150);
        const b = this.rand(2, 20);
        const op = ['+', '-', '*'][this.rand(0, 2)];
        let answer;
        if (op === '+') answer = a + b;
        if (op === '-') answer = a - b;
        if (op === '*') answer = a * b;
        return {
            prompt: `Compute: ${a} ${op} ${b}`,
            answer
        };
    }

    submitAnswer() {
        if (!this.currentQuestion) return;

        const answerInput = document.getElementById('learning-answer');
        const feedbackEl = document.getElementById('learning-feedback');
        if (!answerInput || !feedbackEl) return;

        const userValue = parseFloat(answerInput.value.trim());
        if (Number.isNaN(userValue)) {
            feedbackEl.textContent = 'Enter a valid number.';
            feedbackEl.classList.add('bad');
            feedbackEl.classList.remove('good');
            return;
        }

        const correct = Math.abs(userValue - this.currentQuestion.answer) < 1e-6;
        this.state.totalAnswers += 1;

        if (correct) {
            this.state.correctAnswers += 1;
            this.state.streak += 1;
            feedbackEl.textContent = 'Correct. Excellent work.';
            feedbackEl.classList.add('good');
            feedbackEl.classList.remove('bad');
        } else {
            this.state.streak = 0;
            feedbackEl.textContent = `Not quite. Correct answer: ${this.currentQuestion.answer}`;
            feedbackEl.classList.add('bad');
            feedbackEl.classList.remove('good');
        }

        this.persist();
        this.renderStats();
    }

    buildFormulaPool() {
        if (!window.formulasManager || !window.formulasManager.formulas) return;
        const formulas = window.formulasManager.formulas;
        this.formulaPool = Object.keys(formulas).flatMap((category) => {
            return formulas[category].map((item) => ({ ...item, category }));
        });
    }

    showFormulaSpotlight(forceNext = false) {
        if (!this.formulaPool.length) {
            this.buildFormulaPool();
        }
        if (!this.formulaPool.length) return;

        let selected = this.formulaPool[this.rand(0, this.formulaPool.length - 1)];
        if (forceNext && this.formulaPool.length > 1) {
            let attempts = 0;
            while (selected.category === this.state.lastFormulaCategory && attempts < 10) {
                selected = this.formulaPool[this.rand(0, this.formulaPool.length - 1)];
                attempts += 1;
            }
        }

        this.state.lastFormulaCategory = selected.category;

        const title = document.getElementById('learning-formula-title');
        const expression = document.getElementById('learning-formula-expression');
        const context = document.getElementById('learning-formula-context');

        if (title) title.textContent = `${selected.name} (${selected.category})`;
        if (expression) expression.textContent = selected.formula;
        if (context) context.textContent = selected.description;

        this.persist();
    }

    openFormulaLibrary() {
        if (window.calculatorApp && window.calculatorApp.switchCalculator) {
            window.calculatorApp.switchCalculator('formulas');
        }
    }

    addTask() {
        const input = document.getElementById('learning-task-input');
        if (!input) return;
        const text = input.value.trim();
        if (!text) return;

        this.state.tasks.unshift({
            id: Date.now() + Math.random(),
            text,
            done: false
        });

        input.value = '';
        this.persist();
        this.renderTasks();
        this.renderStats();
    }

    toggleTask(id) {
        this.state.tasks = this.state.tasks.map((task) => {
            if (task.id !== id) return task;
            return { ...task, done: !task.done };
        });
        this.persist();
        this.renderTasks();
        this.renderStats();
    }

    deleteTask(id) {
        this.state.tasks = this.state.tasks.filter((task) => task.id !== id);
        this.persist();
        this.renderTasks();
        this.renderStats();
    }

    saveNotes() {
        const notes = document.getElementById('learning-notes');
        if (!notes) return;
        this.state.notes = notes.value;
        this.persist();
        this.notify('Notes saved', 'success');
    }

    exportNotes() {
        const content = this.state.notes || '';
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'calcify-learning-notes.txt';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }

    renderAll() {
        this.renderGoal();
        this.renderStats();
        this.renderTasks();
        this.updateTimerDisplay();

        const notes = document.getElementById('learning-notes');
        if (notes) notes.value = this.state.notes;

        const timerMode = document.getElementById('learning-timer-mode');
        if (timerMode) timerMode.value = String(this.state.timerMinutes);
    }

    renderGoal() {
        const goalText = document.getElementById('learning-active-goal');
        const goalInput = document.getElementById('learning-goal-input');
        if (goalInput) goalInput.value = this.state.goal;
        if (goalText) {
            goalText.textContent = this.state.goal ? `Active goal: ${this.state.goal}` : 'No goal set yet.';
        }
    }

    renderStats() {
        const accuracy = this.state.totalAnswers === 0
            ? 0
            : Math.round((this.state.correctAnswers / this.state.totalAnswers) * 100);
        const completedTasks = this.state.tasks.filter((task) => task.done).length;

        this.setText('learning-streak', String(this.state.streak));
        this.setText('learning-accuracy', `${accuracy}%`);
        this.setText('learning-sessions', String(this.state.focusSessions));
        this.setText('learning-tasks-done', String(completedTasks));
    }

    renderTasks() {
        const list = document.getElementById('learning-task-list');
        if (!list) return;

        if (!this.state.tasks.length) {
            list.innerHTML = '<li class="learning-task-empty">No tasks yet. Add one to start momentum.</li>';
            return;
        }

        list.innerHTML = this.state.tasks.map((task) => {
            return `
                <li class="learning-task-item ${task.done ? 'done' : ''}">
                    <label>
                        <input type="checkbox" data-task-toggle="${task.id}" ${task.done ? 'checked' : ''}>
                        <span>${this.escapeHtml(task.text)}</span>
                    </label>
                    <button class="learning-task-delete" data-task-delete="${task.id}">Delete</button>
                </li>
            `;
        }).join('');

        list.querySelectorAll('[data-task-toggle]').forEach((checkbox) => {
            checkbox.addEventListener('change', (e) => {
                this.toggleTask(parseFloat(e.target.dataset.taskToggle));
            });
        });

        list.querySelectorAll('[data-task-delete]').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                this.deleteTask(parseFloat(e.target.dataset.taskDelete));
            });
        });
    }

    setText(id, value) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    }

    notify(message, type = 'info') {
        if (window.calculatorApp && window.calculatorApp.showNotification) {
            window.calculatorApp.showNotification(message, type);
        }
    }

    rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    loadState() {
        try {
            const raw = localStorage.getItem(this.storageKey);
            if (!raw) return;
            const parsed = JSON.parse(raw);
            this.state = { ...this.state, ...parsed };
            this.remainingSeconds = this.state.timerMinutes * 60;
        } catch (error) {
            console.error('Failed to load learning hub state', error);
        }
    }

    persist() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.state));
        } catch (error) {
            console.error('Failed to save learning hub state', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.learningHub = new LearningHub();
});

window.LearningHub = LearningHub;

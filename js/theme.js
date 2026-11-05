/* Переключение темы и плотности без библиотек.
 * "auto" означает отсутствие атрибута data-theme у <html>:
 * тёмную тему в этом случае применяет CSS media query.
 */
const root = document.documentElement;
const themeSelect = document.querySelector('#theme-select');
const densitySelect = document.querySelector('#density-select');
const demoAction = document.querySelector('#demo-action');
const demoFeedback = document.querySelector('#demo-feedback');

const THEME_KEY = 'atlas-theme';
const DENSITY_KEY = 'atlas-density';
const THEMES = ['auto', 'light', 'dark'];
const DENSITIES = ['normal', 'compact'];

/* Хранилище может быть недоступно (приватный режим, запрет сайта): интерфейс продолжает работать. */
function readSetting(key, allowed, fallback) {
  try {
    const value = localStorage.getItem(key);
    return allowed.includes(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

function saveSetting(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Выбор действует до перезагрузки страницы. */
  }
}

function applyTheme(choice) {
  if (choice === 'auto') root.removeAttribute('data-theme');
  else root.dataset.theme = choice;
  themeSelect.value = choice;
}

function applyDensity(choice) {
  if (choice === 'compact') root.dataset.density = choice;
  else root.removeAttribute('data-density');
  densitySelect.value = choice;
}

applyTheme(readSetting(THEME_KEY, THEMES, 'auto'));
applyDensity(readSetting(DENSITY_KEY, DENSITIES, 'normal'));

themeSelect.addEventListener('change', () => {
  applyTheme(themeSelect.value);
  saveSetting(THEME_KEY, themeSelect.value);
});

densitySelect.addEventListener('change', () => {
  applyDensity(densitySelect.value);
  saveSetting(DENSITY_KEY, densitySelect.value);
});

/* Обратная связь от кнопки — уже готова. */
demoAction.addEventListener('click', () => {
  demoFeedback.textContent = 'Демонстрация: действие выполнено, новая заявка создана.';
});

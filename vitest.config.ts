import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
	test: {
		globals: true, // позволяет использовать глобальные переменные, такие как `expect` и `test`
		environment: 'jsdom', // тестовое окружение с поддержкой DOM
		include: ['src/**/*.test.ts', 'src/**/*.test.tsx'], // файлы тестов
		setupFiles: 'vitest.setup.ts ', // подключаем файл настройки
	},
});

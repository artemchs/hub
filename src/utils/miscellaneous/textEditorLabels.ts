import type { RichTextEditorLabels } from "@mantine/tiptap";

export const TEXT_EDITOR_LABELS_RU: RichTextEditorLabels = {
  // Controls labels
  linkControlLabel: "Ссылка",
  colorPickerControlLabel: "Цвет текста",
  highlightControlLabel: "Выделить текст",
  colorControlLabel: (color) => `Установить цвет текста ${color}`,
  boldControlLabel: "Жирный",
  italicControlLabel: "Курсив",
  underlineControlLabel: "Подчёркнутый",
  strikeControlLabel: "Зачёркнутый",
  clearFormattingControlLabel: "Очистить форматирование",
  unlinkControlLabel: "Удалить ссылку",
  bulletListControlLabel: "Маркированный список",
  orderedListControlLabel: "Нумерованный список",
  h1ControlLabel: "Заголовок 1",
  h2ControlLabel: "Заголовок 2",
  h3ControlLabel: "Заголовок 3",
  h4ControlLabel: "Заголовок 4",
  h5ControlLabel: "Заголовок 5",
  h6ControlLabel: "Заголовок 6",
  blockquoteControlLabel: "Цитата",
  alignLeftControlLabel: "Выровнять по левому краю",
  alignCenterControlLabel: "Выровнять по центру",
  alignRightControlLabel: "Выровнять по правому краю",
  alignJustifyControlLabel: "Выровнять по ширине",
  codeControlLabel: "Код",
  codeBlockControlLabel: "Блок кода",
  subscriptControlLabel: "Нижний индекс",
  superscriptControlLabel: "Верхний индекс",
  unsetColorControlLabel: "Сбросить цвет",
  hrControlLabel: "Горизонтальная линия",
  undoControlLabel: "Отменить",
  redoControlLabel: "Повторить",

  // Task list
  tasksControlLabel: "Список задач",
  tasksSinkLabel: "Уменьшить уровень",
  tasksLiftLabel: "Увеличить уровень",

  // Link editor
  linkEditorInputLabel: "Введите URL",
  linkEditorInputPlaceholder: "https://example.com/",
  linkEditorExternalLink: "Открыть ссылку в новой вкладке",
  linkEditorInternalLink: "Открыть ссылку в текущей вкладке",
  linkEditorSave: "Сохранить",

  // Color picker control
  colorPickerCancel: "Отмена",
  colorPickerClear: "Очистить цвет",
  colorPickerColorPicker: "Выбор цвета",
  colorPickerPalette: "Цветовая палитра",
  colorPickerSave: "Сохранить",
  colorPickerColorLabel: (color) => `Установить цвет текста ${color}`,
};

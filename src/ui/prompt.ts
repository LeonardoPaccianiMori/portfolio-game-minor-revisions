export interface Prompt {
  readonly element: HTMLElement;
  setText(text: string | null): void;
  dispose(): void;
}

export const createPrompt = (parent: HTMLElement): Prompt => {
  const element = document.createElement('p');
  element.id = 'interaction-prompt';
  element.setAttribute('role', 'status');
  element.hidden = true;
  parent.appendChild(element);

  return {
    element,
    setText(text) {
      element.textContent = text ?? '';
      element.hidden = text === null;
    },
    dispose() {
      element.remove();
    },
  };
};

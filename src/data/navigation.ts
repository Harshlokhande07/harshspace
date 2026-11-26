export interface QuickNavItem {
  id: 'projects' | 'about' | 'skills' | 'contact';
  label: string;
  icon: string;
  interactableId: string;
}

export const QUICK_NAV_ITEMS: QuickNavItem[] = [
  { id: 'projects', label: 'Projects', icon: '📁', interactableId: 'desk-pc' },
  { id: 'about', label: 'About', icon: '📖', interactableId: 'notebook' },
  { id: 'skills', label: 'Skills', icon: '📚', interactableId: 'bookshelf' },
  { id: 'contact', label: 'Contact', icon: '✉️', interactableId: 'contact' },
];

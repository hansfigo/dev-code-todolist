import type { TodoItem } from "./activityDetail";

// Fungsi untuk mengurutkan berdasarkan tanggal terbaru
function sortByNewest(items: TodoItem[]): TodoItem[] {
    return items.slice().sort((a, b) => b.id - a.id);
}

// Fungsi untuk mengurutkan berdasarkan tanggal terlama
function sortByOldest(items: TodoItem[]): TodoItem[] {
    return items.slice().sort((a, b) => a.id - b.id);
}

// Fungsi untuk mengurutkan berdasarkan judul A-Z
function sortByTitleAZ(items: TodoItem[]): TodoItem[] {
    return items.slice().sort((a, b) => a.title.localeCompare(b.title));
}

// Fungsi untuk mengurutkan berdasarkan judul Z-A
function sortByTitleZA(items: TodoItem[]): TodoItem[] {
    return items.slice().sort((a, b) => b.title.localeCompare(a.title));
}

// Fungsi untuk mengurutkan berdasarkan status is_active (sudah selesai)
function sortByIsCompleted(items: TodoItem[]): TodoItem[] {
    return items.filter(item => item.is_active === 1).concat(items.filter(item => item.is_active === 0));
}


export {sortByIsCompleted, sortByNewest, sortByOldest , sortByTitleAZ, sortByTitleZA}
export const imageUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/400x400?text=No+Image';
    if (path.startsWith('http')) return path; // ← already full URL
    return `http://127.0.0.1:8000/storage/${path}`;
};

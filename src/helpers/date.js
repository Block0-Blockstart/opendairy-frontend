export const today = () => new Date().toISOString().split('T')[0];

export const toIsoDate = timestamp => new Date(timestamp).toISOString().split('T')[0];

export const toLocalDate = timestamp => new Date(timestamp).toLocaleDateString();

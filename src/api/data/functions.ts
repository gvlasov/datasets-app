export function utcNow(): Date {
    const now = new Date();
    return new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds()
    ));
}

export function formatDate(date: Date): string {
    return date.toISOString().slice(0, 19) + '+0000';
}

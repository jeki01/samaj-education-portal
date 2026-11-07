const enum PercentageStatus {
    Green = "green",
    Yellow = "yellow",
    Red = "red"
}

export const handlePercentageStatus = (percentage: number): PercentageStatus => {
    if (percentage >= 70) {
        return PercentageStatus.Green;
    } else if (percentage >= 40) {
        return PercentageStatus.Yellow;
    } else {
        return PercentageStatus.Red;
    }
};
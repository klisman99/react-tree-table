import { RefObject, useCallback, useEffect, useState } from "react";

interface useVirtualizerProps {
    containerRef: RefObject<HTMLDivElement>;
    size: number;
    count: number;
}

const BACKUP = 5;

export default function useVirtualizer({ containerRef, size, count }: useVirtualizerProps) {
    const [range, setRange] = useState<number[]>([]);

    const calculateRange = useCallback((container: HTMLDivElement) => {
        const availableHeight = container.getBoundingClientRect()?.height ?? 0;
        const scrollTop = container.scrollTop ?? 0;
        const scrolledRows = Math.round(scrollTop / size);
        const scrolledRowsWithBackup = scrolledRows - BACKUP;
        const visibleRows = Math.floor(availableHeight / size);
        const visibleRowsWithBackup = scrolledRows + visibleRows + BACKUP;
        const first = scrolledRowsWithBackup > 0 ? scrolledRowsWithBackup : 0;
        const last = visibleRowsWithBackup > count ? count : visibleRowsWithBackup;
        const rowsLength = last - first;

        setRange(Array(rowsLength).fill(1).map((_, i) => i + first));
    }, [count, size]);

    useEffect(() => {
        const container = containerRef.current;

        const handleScroll = (e: Event) => calculateRange(e.target as HTMLDivElement);

        container?.addEventListener("scroll", handleScroll);

        return () => {
            container?.removeEventListener("scroll", handleScroll)
        };
    }, [containerRef, calculateRange]);

    useEffect(() => {
        if (containerRef.current) {
            calculateRange(containerRef.current);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [containerRef, count]);

    return {
        range,
        totalSize: count * size
    };
}
import type { PaginationItemRenderProps } from "@heroui/react";
import { cn, Pagination, PaginationItemType } from "@heroui/react";
import type { SVGProps } from "react";

type IconSvgProps = SVGProps<SVGSVGElement>;

export const ChevronIcon = (props: IconSvgProps) => {
	return (
		<svg
			aria-hidden="true"
			fill="none"
			focusable="false"
			height="1em"
			role="presentation"
			viewBox="0 0 24 24"
			width="1em"
			{...props}
		>
			<path
				d="M15.5 19l-7-7 7-7"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
			/>
		</svg>
	);
};

export default function PaginationUI(data: {
	total: number;
	totalPages: number;
	setCurrentPageCount: (value: React.SetStateAction<number>) => void;
}) {
	const renderItem = ({
		ref,
		key,
		value,
		isActive,
		onNext,
		onPrevious,
		setPage,
		className,
		page,
	}: PaginationItemRenderProps) => {
		if (value === PaginationItemType.NEXT) {
			return (
				<button
					type="button"
					key={key}
					className={cn(className, "bg-default-200/50 min-w-6 w-7 h-7")}
					onClick={() => {
						if (page <= data.totalPages) {
							data.setCurrentPageCount(page);
							onNext();
						}
					}}
				>
					<ChevronIcon className="rotate-180" />
				</button>
			);
		}

		if (value === PaginationItemType.PREV) {
			return (
				<button
					type="button"
					key={key}
					className={cn(className, "bg-default-200/50 min-w-6 w-7 h-7")}
					onClick={() => {
						data.setCurrentPageCount(page);
						onPrevious();
					}}
				>
					<ChevronIcon />
				</button>
			);
		}

		if (value === PaginationItemType.DOTS) {
			return (
				<button type="button" key={key} className={className}>
					...
				</button>
			);
		}

		return (
			<button
				type="button"
				key={key}
				ref={ref}
				className={cn(
					className,
					isActive &&
					"min-w-6 w-7 h-7 text-white text-[12px] bg-[#9533FB]",
				)}
				onClick={() => {
					data.setCurrentPageCount(page);
					setPage(value);
				}}
			>
				{value}
			</button>
		);
	};
	return (
		<Pagination
			disableCursorAnimation
			showControls
			className="gap-2"
			initialPage={1}
			radius="sm"
			renderItem={renderItem}
			total={data.total}
			variant="light"
			boundaries={1}
		/>
	);
}

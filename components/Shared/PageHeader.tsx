import React from 'react';

interface PageHeaderProps {
	title: string;
	subtitle?: string;
	actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, actions }) => {
	return (
		<div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-10">
			<div>
				<h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase mb-2">
					{title}
				</h2>
				{subtitle && (
					<p className="text-zinc-500 font-medium text-base md:text-lg">
						{subtitle}
					</p>
				)}
			</div>
			{actions && (
				<div className="flex flex-wrap items-center gap-4">
					{actions}
				</div>
			)}
		</div>
	);
};

export default PageHeader;

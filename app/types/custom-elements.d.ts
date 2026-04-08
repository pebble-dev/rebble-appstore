import "react";

declare module "react" {
	namespace JSX {
		interface IntrinsicElements {
			brand: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
			content: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
		}
	}
}


import type { Metadata } from 'next';
import StyledComponentsRegistry from './registry';
import { Providers } from './providers';

export const metadata: Metadata = {
    title: 'Sports Brain Buzz',
    description: 'A web application for sports enthusiasts using React and TypeScript.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Catamaran:wght@700&family=Fascinate+Inline&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <StyledComponentsRegistry>
                    <Providers>{children}</Providers>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}

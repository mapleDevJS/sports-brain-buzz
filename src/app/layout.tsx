import type { Metadata } from 'next';
import { Catamaran, Fascinate_Inline } from 'next/font/google';
import StyledComponentsRegistry from './registry';
import { Providers } from './providers';

const catamaran = Catamaran({
    weight: '700',
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-catamaran',
});

const fascinateInline = Fascinate_Inline({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-fascinate',
});

export const metadata: Metadata = {
    title: 'Sports Brain Buzz',
    description: 'A web application for sports enthusiasts using React and TypeScript.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${catamaran.variable} ${fascinateInline.variable}`}>
            <body>
                <StyledComponentsRegistry>
                    <Providers>{children}</Providers>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}

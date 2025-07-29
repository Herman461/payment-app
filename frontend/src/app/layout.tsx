import BaseFooter from '@/components/BaseFooter'
import BaseHeader from '@/components/BaseHeader'
import '@/scss/style.scss'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">

            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            </head>
            <body>

                <div className="wrapper">

                    <BaseHeader />
                    <main className="page">
                        <div className="page__container container">
                            {children}
                        </div>

                    </main>

                    <BaseFooter />
                </div>
            </body >

        </html >
    )
}
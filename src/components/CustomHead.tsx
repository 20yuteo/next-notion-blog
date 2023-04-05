import Head from "next/head";

const CustomHead = ({ title, content }: { title?: string, content?: string }) => {
    return (
        <Head>
            <title>{title ?? "カオスなブログ"}</title>
            <meta name="description" content={content ?? "リバ邸カオスが運営するブログサイトです。"} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/emoji_u1f354.png" />
        </Head>
    )
}
export default CustomHead;
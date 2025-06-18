import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookMessengerIcon,
    FacebookMessengerShareButton,
    FacebookShareButton,
    HatenaIcon,
    HatenaShareButton,
    InstapaperIcon,
    InstapaperShareButton,
    LineIcon,
    LineShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    LivejournalIcon,
    LivejournalShareButton,
    MailruIcon,
    MailruShareButton,
    PocketIcon,
    PocketShareButton,
    RedditIcon,
    RedditShareButton,
    TelegramIcon,
    TelegramShareButton,
    TumblrIcon,
    TumblrShareButton,
    TwitterShareButton,
    ViberIcon,
    ViberShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    WorkplaceIcon,
    WorkplaceShareButton,
    XIcon,
} from "react-share";

type Props = {
    shareUrl?: string;
    title?: string;
}

export default function SocialShare({
    shareUrl = "https://www.costrad.org ",
    title = "COSTrAD - by Dr. Abu Bako",
}
) {

    return (
        <div className=" flex items-center gap-3 flex-wrap">
            <div className="Demo__some-network">
                <FacebookShareButton
                    url={shareUrl}
                    className=""
                >
                    <FacebookIcon size={32} round />
                </FacebookShareButton>

            </div>

            <div className="Demo__some-network">
                <FacebookMessengerShareButton
                    url={shareUrl}
                    appId="521270401588372"
                    className=""
                >
                    <FacebookMessengerIcon size={32} round />
                </FacebookMessengerShareButton>
            </div>

            <div className="Demo__some-network">
                <TwitterShareButton
                    url={shareUrl}
                    title={title}
                    className=""
                >
                    <XIcon size={32} round />
                </TwitterShareButton>
            </div>

            <div className="Demo__some-network">
                <TelegramShareButton
                    url={shareUrl}
                    title={title}
                    className=""
                >
                    <TelegramIcon size={32} round />
                </TelegramShareButton>
            </div>

            <div className="Demo__some-network">
                <WhatsappShareButton
                    url={shareUrl}
                    title={title}
                    separator=":: "
                    className=""
                >
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
            </div>

            <div className="Demo__some-network">
                <LinkedinShareButton
                    url={shareUrl}
                    className=""
                >
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
            </div>



            <div className="Demo__some-network">
                <RedditShareButton
                    url={shareUrl}
                    title={title}
                    windowWidth={660}
                    windowHeight={460}
                    className=""
                >
                    <RedditIcon size={32} round />
                </RedditShareButton>

            </div>



            <div className="Demo__some-network">
                <TumblrShareButton
                    url={shareUrl}
                    title={title}
                    className=""
                >
                    <TumblrIcon size={32} round />
                </TumblrShareButton>


            </div>

            <div className="Demo__some-network">
                <LivejournalShareButton
                    url={shareUrl}
                    title={title}
                    description={shareUrl}
                    className=""
                >
                    <LivejournalIcon size={32} round />
                </LivejournalShareButton>
            </div>

            <div className="Demo__some-network">
                <MailruShareButton
                    url={shareUrl}
                    title={title}
                    className=""
                >
                    <MailruIcon size={32} round />
                </MailruShareButton>
            </div>

            <div className="Demo__some-network">
                <EmailShareButton
                    url={shareUrl}
                    subject={title}
                    body="body"
                    className=""
                >
                    <EmailIcon size={32} round />
                </EmailShareButton>
            </div>

            <div className="Demo__some-network">
                <ViberShareButton
                    url={shareUrl}
                    title={title}
                    className=""
                >
                    <ViberIcon size={32} round />
                </ViberShareButton>
            </div>

            <div className="Demo__some-network">
                <WorkplaceShareButton
                    url={shareUrl}
                    quote={title}
                    className=""
                >
                    <WorkplaceIcon size={32} round />
                </WorkplaceShareButton>
            </div>

            <div className="Demo__some-network">
                <LineShareButton
                    url={shareUrl}
                    title={title}
                    className=""
                >
                    <LineIcon size={32} round />
                </LineShareButton>
            </div>

            <div className="Demo__some-network">
                <PocketShareButton
                    url={shareUrl}
                    title={title}
                    className=""
                >
                    <PocketIcon size={32} round />
                </PocketShareButton>
            </div>

            <div className="Demo__some-network">
                <InstapaperShareButton
                    url={shareUrl}
                    title={title}
                    className=""
                >
                    <InstapaperIcon size={32} round />
                </InstapaperShareButton>
            </div>

            <div className="Demo__some-network">
                <HatenaShareButton
                    url={shareUrl}
                    title={title}
                    windowWidth={660}
                    windowHeight={460}
                    className=""
                >
                    <HatenaIcon size={32} round />
                </HatenaShareButton>


            </div>
        </div>
    );
}
import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Text,
  Tailwind,
} from "@react-email/components";

interface NewsletterConfirmationEmailProps {
  name?: string;
  unsubscribeToken?: string;
}

export const NewsletterConfirmationEmail = ({
  name,
  unsubscribeToken
}: NewsletterConfirmationEmailProps) => {
  const previewText = `You're now subscribed to COSTrAD newsletters`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white text-black font-sans">
          <Container className="my-10 px-6 py-8 border rounded-md shadow-md max-w-xl">
            <Text className="text-sm leading-6">
              {name ? `Dear ${name},` : "Hello,"}
            </Text>

            <Text className="text-sm leading-6">
              Thank you for subscribing to the{" "}
              <strong>COSTrAD Newsletter</strong>!
            </Text>

            <Text className="text-sm leading-6">
              You’ll now receive occasional updates, exclusive invitations, and
              the latest insights from COSTrAD, delivered straight to your inbox.
            </Text>

            <Text className="text-sm leading-6 mt-4">
              Want to stop receiving emails? You can unsubscribe at any time by
              clicking the link below:
            </Text>

            <a
              href={`https://www.costrad.org/api/unsubscribe/${unsubscribeToken}`}
              className="text-blue-600 underline"
            >
              Unsubscribe from this list
            </a>

            <Text className="text-xs text-muted mt-6">
              If this wasn't you or you wish to unsubscribe at any time, simply
              click the unsubscribe link in any of our emails or contact us at{" "}
              <a href="mailto:correspondence@costrad.org">
                correspondence@costrad.org
              </a>
              .
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

import { Body, Container, Head, Hr, Html, Img, Link, Preview, Text } from "react-email";
import { emails } from "../content/emails";

type ConfirmationEmailProps = {
  firstName: string;
  /** Full booking URL, or null to leave the booking sentence out. */
  bookingUrl: string | null;
  siteUrl: string;
};

const copy = emails.confirmation;

const text = { fontSize: "15px", lineHeight: "24px", color: "#0E1B21", margin: "0 0 16px" };

/** Deliberately plain: it should read like a note from a person, not a newsletter. */
export function ConfirmationEmail({ firstName, bookingUrl, siteUrl }: ConfirmationEmailProps) {
  const siteHost = new URL(siteUrl).host;
  return (
    <Html lang="en">
      <Head />
      <Preview>{copy.preview}</Preview>
      <Body style={{ backgroundColor: "#ffffff", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif", margin: 0 }}>
        <Container style={{ maxWidth: "520px", padding: "32px 20px" }}>
          <Img src={`${siteUrl}/brand/png/icon-192.png`} width="32" height="32" alt="Strobe" style={{ marginBottom: "24px" }} />
          <Text style={text}>{copy.greeting(firstName)}</Text>
          <Text style={text}>
            {copy.body}{" "}
            {bookingUrl ? (
              <>
                {copy.book.before}
                <Link href={bookingUrl} style={{ color: "#00708F" }}>
                  {bookingUrl}
                </Link>
                {copy.book.after}
              </>
            ) : (
              copy.replyOnly
            )}
          </Text>
          <Text style={{ ...text, margin: "24px 0 0" }}>{copy.signOff}</Text>
          <Hr style={{ borderColor: "#DFE6E9", margin: "32px 0 16px" }} />
          <Text style={{ fontSize: "12px", lineHeight: "18px", color: "#5E6D75", margin: 0 }}>
            {copy.footer} ·{" "}
            <Link href={siteUrl} style={{ color: "#5E6D75" }}>
              {siteHost}
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

/** Plain-text version, written out so it reads like a normal email in text-only clients. */
export function confirmationText({ firstName, bookingUrl, siteUrl }: ConfirmationEmailProps) {
  const booking = bookingUrl ? `${copy.book.before}${bookingUrl}${copy.book.after}` : copy.replyOnly;
  return [copy.greeting(firstName), `${copy.body} ${booking}`, copy.signOff, "--", `${copy.footer} · ${siteUrl}`].join("\n\n");
}

ConfirmationEmail.PreviewProps = {
  firstName: "Jordan",
  bookingUrl: "https://cal.com/strobe/walkthrough",
  siteUrl: "https://strobehq.com",
} satisfies ConfirmationEmailProps;

export default ConfirmationEmail;

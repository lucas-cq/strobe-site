import { Body, Container, Head, Heading, Html, Preview, Section, Text } from "react-email";
import { emails } from "../content/emails";

type LeadNotificationProps = {
  /** Label and value pairs, already formatted, in display order. */
  rows: [string, string][];
  summary: string;
  heading?: string;
};

const cell = { fontSize: "14px", lineHeight: "20px", padding: "8px 12px", borderBottom: "1px solid #DFE6E9", verticalAlign: "top" as const };

export function LeadNotificationEmail({ rows, summary, heading = emails.notification.heading }: LeadNotificationProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{summary}</Preview>
      <Body style={{ backgroundColor: "#F5F8F9", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif", margin: 0 }}>
        <Container style={{ maxWidth: "640px", padding: "24px 16px" }}>
          <Heading as="h1" style={{ fontSize: "18px", color: "#0E1B21", margin: "0 0 4px" }}>
            {heading}
          </Heading>
          <Text style={{ fontSize: "14px", color: "#34444C", margin: "0 0 16px" }}>{summary}</Text>
          <Section style={{ backgroundColor: "#ffffff", border: "1px solid #DFE6E9", borderRadius: "8px" }}>
            <table width="100%" cellPadding={0} cellSpacing={0} role="presentation" style={{ borderCollapse: "collapse" }}>
              <tbody>
                {rows.map(([label, value]) => (
                  <tr key={label}>
                    <td style={{ ...cell, color: "#5E6D75", width: "34%" }}>{label}</td>
                    <td style={{ ...cell, color: "#0E1B21", whiteSpace: "pre-wrap" }}>{value || "(none)"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export function leadNotificationText({ rows, summary }: LeadNotificationProps) {
  return [summary, "", ...rows.map(([label, value]) => `${label}: ${value || "(none)"}`)].join("\n");
}

LeadNotificationEmail.PreviewProps = {
  summary: "Sample Fire Ltd. · Calgary · 2–5 techs",
  rows: [
    ["Full name", "Jordan Sample"],
    ["Work email", "jordan@example.com"],
    ["Company", "Sample Fire Ltd."],
  ],
} satisfies LeadNotificationProps;

export default LeadNotificationEmail;

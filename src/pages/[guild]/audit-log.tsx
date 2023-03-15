import { Spinner } from "@chakra-ui/react"
import Layout from "components/common/Layout"
import Section from "components/common/Section"
import AuditLogAction from "components/[guild]/audit-log/AuditLogAction"
import AuditLogFiltersBar from "components/[guild]/audit-log/AuditLogFiltersBar"
import useAuditLog from "components/[guild]/audit-log/hooks/useAuditLog"
import useGuild from "components/[guild]/hooks/useGuild"
import Tabs from "components/[guild]/Tabs/Tabs"
import { ThemeProvider, useThemeContext } from "components/[guild]/ThemeContext"

const AuditLog = (): JSX.Element => {
  const { name } = useGuild()
  const { textColor, localThemeColor, localBackgroundImage } = useThemeContext()

  // TODO: redirect if user is not an admin of the guild

  const { data } = useAuditLog()

  return (
    <Layout
      title={name}
      ogTitle={`Audig Log - ${name}`}
      textColor={textColor}
      background={localThemeColor}
      backgroundImage={localBackgroundImage}
      showBackButton
    >
      <Tabs />
      <AuditLogFiltersBar />

      <Section title="Actions" mt={8}>
        {data?.length ? (
          data.map((action) => <AuditLogAction key={action.id} action={action} />)
        ) : (
          // TODO: skeleton loader!
          <Spinner />
        )}
      </Section>
    </Layout>
  )
}

const AuditLogWrapper = (): JSX.Element => (
  <ThemeProvider>
    <AuditLog />
  </ThemeProvider>
)

export default AuditLogWrapper

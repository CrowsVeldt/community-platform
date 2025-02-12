import { Field } from 'react-final-form'
import { ExternalLink } from 'oa-components'
import { getSupportedProfileTypes } from 'src/modules/profile'
import { buttons, fields, headings } from 'src/pages/UserSettings/labels'
import { Box, Flex, Grid, Heading, Paragraph, Text, useThemeUI } from 'theme-ui'

import { FlexSectionContainer } from '../elements'
import { CustomRadioField } from '../fields/CustomRadio.field'

import type { ProfileTypeName } from 'oa-shared'
import type { ThemeWithName } from 'oa-themes'

const ProfileTypes = () => {
  const profileGuidelinesUrl =
    import.meta.env.VITE_PROFILE_GUIDELINES_URL ||
    process.env.VITE_PROFILE_GUIDELINES_URL
  const { description, error } = fields.activities
  const themeUi = useThemeUI()
  const theme = themeUi.theme as ThemeWithName

  // Only profile types with a valid theme badge will display
  const profileTypes = getSupportedProfileTypes().filter(({ label }) =>
    Object.keys(theme.badges).includes(label),
  )

  if (profileTypes.length < 2) {
    return null
  }

  return (
    <Field
      name="profileType"
      render={(props) => (
        <FlexSectionContainer data-cy="FocusSection">
          <Flex sx={{ flexDirection: 'column', gap: 1 }}>
            <Heading as="h2">{headings.focus}</Heading>
            <Paragraph>
              {description}{' '}
              <ExternalLink
                href={profileGuidelinesUrl}
                sx={{ textDecoration: 'underline', color: 'grey' }}
                type="button"
              >
                {buttons.guidelines}
              </ExternalLink>
            </Paragraph>
          </Flex>

          <Flex sx={{ flexDirection: 'column', gap: 4 }}>
            {props.meta.error && <Text color={theme.colors.red}>{error}</Text>}

            <Grid columns={['repeat(auto-fill, minmax(125px, 1fr))']} gap={2}>
              {profileTypes.map((profile, index: number) => (
                <Box key={index}>
                  <CustomRadioField
                    data-cy={profile.label}
                    value={profile.label}
                    name="profileType"
                    isSelected={profile.label === props.input.value}
                    onChange={(v) => props.input.onChange(v as ProfileTypeName)}
                    textLabel={profile.textLabel}
                  />
                </Box>
              ))}
            </Grid>
          </Flex>
        </FlexSectionContainer>
      )}
    />
  )
}

export const FocusSection = () => (
  <Field name="profileType" render={ProfileTypes} />
)

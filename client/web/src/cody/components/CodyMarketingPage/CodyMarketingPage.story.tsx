import { Meta, Story } from '@storybook/react'

import { AuthenticatedUser } from '../../../auth'
import { WebStory } from '../../../components/WebStory'
import { SourcegraphContext } from '../../../jscontext'

import { CodyMarketingPage } from './CodyMarketingPage'

const config: Meta = {
    title: 'web/src/cody/CodyMarketingPage',
}

export default config

const context: Pick<SourcegraphContext, 'authProviders'> = {
    authProviders: [
        {
            serviceType: 'github',
            displayName: 'GitHub.com',
            isBuiltin: false,
            authenticationURL: '/.auth/github/login?pc=https%3A%2F%2Fgithub.com%2F',
            serviceID: 'https://github.com',
        },
        {
            serviceType: 'gitlab',
            displayName: 'GitLab.com',
            isBuiltin: false,
            authenticationURL: '/.auth/gitlab/login?pc=https%3A%2F%2Fgitlab.com%2F',
            serviceID: 'https://gitlab.com',
        },
    ],
}

export const SourcegraphDotCom: Story = () => (
    <WebStory>
        {() => <CodyMarketingPage context={context} isSourcegraphDotCom={true} authenticatedUser={null} />}
    </WebStory>
)
export const Enterprise: Story = () => (
    <WebStory>
        {() => <CodyMarketingPage context={context} isSourcegraphDotCom={false} authenticatedUser={null} />}
    </WebStory>
)

export const EnterpriseSiteAdmin: Story = () => (
    <WebStory>
        {() => (
            <CodyMarketingPage
                context={context}
                isSourcegraphDotCom={false}
                authenticatedUser={{ siteAdmin: true } as AuthenticatedUser}
            />
        )}
    </WebStory>
)

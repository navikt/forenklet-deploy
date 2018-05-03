package no.nav.fo.forenkletdeploy.config

import no.nav.fo.forenkletdeploy.CorsFilter
import no.nav.fo.forenkletdeploy.commits.IStashCommitProvider
import no.nav.fo.forenkletdeploy.commits.MockStashCommitProvider
import no.nav.fo.forenkletdeploy.commits.StashCommitProvider
import no.nav.fo.forenkletdeploy.provider.TeamProvider
import no.nav.fo.forenkletdeploy.service.*
import no.nav.fo.forenkletdeploy.util.mockEnabled
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.scheduling.annotation.EnableScheduling
import org.springframework.boot.web.servlet.FilterRegistrationBean



@Configuration
@EnableScheduling
open class ApplicationConfig {
    @Bean
    open fun stashCommitProvider(): IStashCommitProvider =
            if (!mockEnabled()) StashCommitProvider() else MockStashCommitProvider()

    @Bean
    open fun jiraIssueService(): IJiraIssueService =
            if (!mockEnabled()) JiraIssueService() else MockJiraIssueService()

    @Bean
    open fun applicationService(teamProvider: TeamProvider): IApplicationService =
            if (!mockEnabled()) ApplicationService(teamProvider) else MockApplicationService(teamProvider)

    @Bean
    open fun veraDeployService(applicationService: IApplicationService): IVeraDeployService =
            if (!mockEnabled()) VeraDeployService() else MockVeraDeployService(applicationService)

    @Bean
    open fun corsFilterRegistration(): FilterRegistrationBean<CorsFilter> {
        val frb: FilterRegistrationBean<CorsFilter> = FilterRegistrationBean()
        frb.filter = CorsFilter()
        frb.urlPatterns = arrayListOf("/*")
        return frb
    }
}

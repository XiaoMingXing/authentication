import Dashboard from '../components/dashboard'
// Widgets
import DateTime from '../components/widgets/datetime'
import PageSpeedInsightsScore from '../components/widgets/pagespeed-insights/score'
import PageSpeedInsightsStats from '../components/widgets/pagespeed-insights/stats'
import PageVisit from '../components/widgets/useractivity'
// Theme
import lightTheme from '../styles/light-theme'
// import darkTheme from '../styles/dark-theme'

export default () => (
    <Dashboard theme={lightTheme}>
        <DateTime/>

        <PageSpeedInsightsScore url='https://github.com'/>

        <PageSpeedInsightsStats url='https://github.com'/>

        <PageVisit
            title='Total Page Visit'
        />

    </Dashboard>
)


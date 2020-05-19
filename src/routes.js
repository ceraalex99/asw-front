import ContributionList from "@/components/contributions/ContributionList";
import ContributionShow from "@/components/contributions/ContributionShow";
import ContributionNew from "@/components/contributions/ContributionNew";
import ContributionEdit from "@/components/contributions/ContributionEdit";


export default [
    {path: '/', redirect: '/contributions'},
    {name: 'contributionList', path: '/contributions', component: ContributionList},
    {name: 'contributionNew', path: '/contributions/new', component: ContributionNew},
    {name: 'contributionShow', path: '/contributions/:id', component: ContributionShow},
    {name: 'contributionEdit', path: '/contributions/:id/edit', component: ContributionEdit}
]
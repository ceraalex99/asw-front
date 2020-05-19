import ContributionList from "@/components/ContributionList";
import ContributionShow from "@/components/ContributionShow";
import ContributionNew from "@/components/ContributionNew";
import ContributionEdit from "@/components/ContributionEdit";


export default [
    {path: '/', redirect: '/contributions'},
    {name: 'contributionList', path: '/contributions', component: ContributionList},
    {name: 'contributionNew', path: '/contributions/new', component: ContributionNew},
    {name: 'contributionShow', path: '/contributions/:id', component: ContributionShow},
    {name: 'contributionEdit', path: '/contributions/:id/edit', component: ContributionEdit}
]
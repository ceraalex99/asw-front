import ContributionList from "@/components/contributions/ContributionList";
import ContributionShow from "@/components/contributions/ContributionShow";
import ContributionNew from "@/components/contributions/ContributionNew";
import ContributionEdit from "@/components/contributions/ContributionEdit";
import ContributionNewest from "@/components/contributions/ContributionNewest";
import ContributionAsk from "@/components/contributions/ContributionAsk";
import ContributionThreads from "@/components/contributions/ContributionThreads";
import UserShow from "@/users/UserShow";
import Login from "@/components/Login";


export default [
    {path: '/', redirect: '/contributions'},
    {name: 'contributionList', path: '/contributions', component: ContributionList},
    {name: 'contributionNew', path: '/contributions/new', component: ContributionNew},
    {name: 'contributionEdit', path: '/contributions/:id/edit', component: ContributionEdit},
    {name: 'contributionNewest', path: '/contributions/newest', component: ContributionNewest},
    {name: 'contributionAsk', path: '/contributions/ask', component: ContributionAsk},
    {name: 'contributionThreads', path: '/contributions/threads', component: ContributionThreads},
    {name: 'contributionShow', path: '/contributions/:id', component: ContributionShow},
    {name: 'userShow', path: '/users/:id', component: UserShow}
    {name: 'contributionEdit', path: '/contributions/:id/edit', component: ContributionEdit},
    {name: 'login', path: '/login', component: Login}
]
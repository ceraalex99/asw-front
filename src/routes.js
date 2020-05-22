import ContributionList from "@/components/contributions/ContributionList";
import ContributionShow from "@/components/contributions/ContributionShow";
import ContributionNew from "@/components/contributions/ContributionNew";
import ContributionEdit from "@/components/contributions/ContributionEdit";
import ContributionNewest from "@/components/contributions/ContributionNewest";
import ContributionAsk from "@/components/contributions/ContributionAsk";
import ContributionThreads from "@/components/contributions/ContributionThreads";
import UserShow from "@/components/users/UserShow";
import CommentShow from '@/components/comments/CommentShow';
import UserEdit from '@/components/users/UserEdit';


export default [
    {path: '/', redirect: '/contributions'},
    {name: 'contributionList', path: '/contributions', component: ContributionList},
    {name: 'contributionNew', path: '/contributions/new', component: ContributionNew},
    {name: 'contributionEdit', path: '/contributions/:id/edit', component: ContributionEdit},
    {name: 'contributionNewest', path: '/contributions/newest', component: ContributionNewest},
    {name: 'contributionAsk', path: '/contributions/ask', component: ContributionAsk},
    {name: 'contributionThreads', path: '/contributions/threads', component: ContributionThreads},
    {name: 'contributionShow', path: '/contributions/:id', component: ContributionShow},
    {name: 'userEdit', path: '/users/:id/edit', component: UserEdit},
    {name: 'userShow', path: '/users/:id', component: UserShow},
    {name: 'commentShow', path: '/comments/:id', component: CommentShow}
]
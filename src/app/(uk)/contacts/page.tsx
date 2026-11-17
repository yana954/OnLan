import { ContactsRoute, staticPageMetadata } from '@/lib/pageBuilders';

export const metadata = staticPageMetadata('/contacts', 'uk');

export default function Contacts() {
    return <ContactsRoute lang="uk" />;
}

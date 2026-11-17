import { ContactsRoute, staticPageMetadata } from '@/lib/pageBuilders';

export const metadata = staticPageMetadata('/contacts', 'en');

export default function Contacts() {
    return <ContactsRoute lang="en" />;
}

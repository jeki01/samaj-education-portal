import Loading from '@/ui/Loading';
import { lazy, Suspense } from 'react';
const Subject = lazy(() => import("./Subject"));
export default function SubjectIndex() {
    return (
        <div>
            <Suspense fallback={<Loading />}>
                <Subject />
            </Suspense>
        </div>
    )
}

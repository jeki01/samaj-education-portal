import Loading from '@/ui/Loading';
import { lazy, Suspense } from 'react';
const SkillBundle = lazy(() => import("./SkillBundle"));
export default function SkillBundleIndex() {
    return (
        <div>
            <Suspense fallback={<Loading />}>
                <SkillBundle />
            </Suspense>
        </div>
    )
}

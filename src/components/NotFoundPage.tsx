import PageLayout from './PageLayout';
import Image from "next/image";

export default function NotFoundPage() {

  return (
    <PageLayout title='error'>
     <Image src={'/404.png'} alt={'Error'} width={1500} height={900} className={'w-full h-auto'}/>
    </PageLayout>
  );
}

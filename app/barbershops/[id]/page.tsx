import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import BarbershopInfo from "./components/barbershop-info";
import ServiceItem from "./components/service-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface BarbershopParam {
    params: {
        id?: string
    }
}

const BarbershopDetails = async ({ params }: BarbershopParam) => {

    const session = await getServerSession(authOptions);

    if (!params.id) {

        return null;
    }

    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id
        },
        include: {
            services: true
        }
    })

    if (!barbershop) {

        return null;
    }

    return (
        <div>
            <BarbershopInfo barbershop={barbershop} />

            <div className="px-5 flex flex-col gap-3 py-6">
                {barbershop.services.map((service) => (
                    <ServiceItem key={service.id} service={service} isAuth={!!session?.user}/>
                ))}
            </div>
        </div>
    );
}
 
export default BarbershopDetails;
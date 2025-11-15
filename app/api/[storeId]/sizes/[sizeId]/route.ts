import prismadb from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET (
    req: NextRequest, 
    { params }: { params: { sizeId: string }}
) {
    const { sizeId } = await params
    try {
        if(!sizeId) {
            return new NextResponse("Size id is required", { status: 400 })
        }
        
        const size = await prismadb.size.findUnique({
            where: {
                id: sizeId,
            }
        })

        return NextResponse.json(size);
    } catch (error) {
        console.log('[SIZE_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}


export async function PATCH (
    req: NextRequest, 
    { params }: { params: { storeId: string, sizeId: string }}
) { 
    try {
        const { sizeId, storeId } = await params
        const { userId } = await auth()
        const body = await req.json();
        const { name, value } = body;

        if(!userId) {
            return new NextResponse('Unauthenticated', { status: 401 });
        }

        if(!name) {
            return new NextResponse("Name is required", { status: 400 });
        }
        if(!value) {
            return new NextResponse("Value is required", { status: 400 });
        }

        if(!sizeId) {
            return new NextResponse("Size id is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: storeId,
                userId
            }
        })

        if(!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        const size = await prismadb.size.updateMany({
            where: {
                id: sizeId,
            },
            data: {
                name,
                value
            }
        })

        return NextResponse.json(size);
    } catch (error) {
        console.log('[SIZE_PATCH]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}


export async function DELETE (
    req: NextRequest, 
    { params }: { params: { storeId: string, sizeId: string }}
) {
    try {
        const { userId } = await auth()
        const {storeId, sizeId } = await params;
        if(!userId) {
            return new NextResponse('Unauthenticated', { status: 401 });
        }

        if(!sizeId) {
            return new NextResponse("Size id is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: storeId,
                userId
            }
        })

        if(!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        const size = await prismadb.size.deleteMany({
            where: {
                id: sizeId,
            }
        })

        return NextResponse.json(size);
    } catch (error) {
        console.log('[SIZE_DELETE]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}




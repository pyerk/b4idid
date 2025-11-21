import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/client'

// GET - Fetch all galleries
export async function GET() {
  try {
    const supabase = createSupabaseServerClient()

    const { data: galleries, error } = await supabase
      .from('galleries')
      .select('*')
      .order('date', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching galleries:', error)
      return NextResponse.json(
        { error: 'Failed to fetch galleries', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ galleries: galleries || [] })
  } catch (error: any) {
    console.error('Error in GET galleries:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

// POST - Create a new gallery
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    const supabase = createSupabaseServerClient()

    const { data: gallery, error } = await supabase
      .from('galleries')
      .insert({
        title: body.title,
        description: body.description || null,
        cover_image_url: body.cover_image_url || null,
        date: body.date || null,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating gallery:', error)
      return NextResponse.json(
        { error: 'Failed to create gallery', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, gallery }, { status: 201 })
  } catch (error: any) {
    console.error('Error in POST galleries:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}


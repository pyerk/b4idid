import { NextRequest, NextResponse } from 'next/server'
import { createBooking } from '@/lib/supabase/queries'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.client_name || !body.client_email || !body.event_type || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const booking = await createBooking({
      client_name: body.client_name,
      client_email: body.client_email,
      client_phone: body.client_phone || null,
      event_type: body.event_type,
      event_date: body.event_date || null,
      message: body.message,
    })

    return NextResponse.json({ success: true, booking }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { error: 'Failed to create booking', details: error.message },
      { status: 500 }
    )
  }
}


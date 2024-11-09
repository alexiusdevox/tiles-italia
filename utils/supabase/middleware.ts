import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            // Mantieni le opzioni esistenti dei cookie
            response.cookies.set(name, value, {
              ...options,
              // Imposta secure a true in produzione
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
              path: "/"
            });
          },
          remove(name: string, options: any) {
            response.cookies.set(name, "", options);
          },
        },
      }
    );

    // Il resto del codice rimane uguale
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // ... resto del codice del middleware ...

    return response;
  } catch (e) {
    console.error("Errore nel middleware:", e);
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
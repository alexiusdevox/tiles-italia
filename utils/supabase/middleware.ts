import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  try {
    // Crea una risposta base
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
            response.cookies.set(name, value, options);
          },
          remove(name: string, options: any) {
            response.cookies.set(name, "", options);
          },
        },
      }
    );

    // Verifica la sessione dell'utente
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Gestione dei reindirizzamenti
    const isAuthPage = request.nextUrl.pathname === "/sign-in" || 
                      request.nextUrl.pathname === "/sign-up";
    const isProtectedRoute = request.nextUrl.pathname.startsWith("/account");

    // Se l'utente è autenticato e sta cercando di accedere a una pagina di auth
    if (session && isAuthPage) {
      return NextResponse.redirect(new URL("/account", request.url));
    }

    // Se l'utente non è autenticato e sta cercando di accedere a una route protetta
    if (!session && isProtectedRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // Aggiorna i cookie della sessione
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
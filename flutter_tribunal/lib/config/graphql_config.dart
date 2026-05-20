import 'package:flutter/foundation.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

// ─── Cambia esta URL por la IP/dominio del servidor en producción ───
const String kBackendUrl = 'http://192.168.100.61:8000/graphql/';
// 10.0.2.2 es el localhost del host en el emulador Android.
// Para dispositivo físico en red local usa la IP de la máquina, ej: http://192.168.1.X:8000/graphql/

class GraphQLConfig {
  static final FlutterSecureStorage _storage = const FlutterSecureStorage();

  static Future<GraphQLClient> buildClient() async {
    final authLink = AuthLink(
      getToken: () async {
        final t = await _storage.read(key: 'jwt_token');
        return t != null ? 'JWT $t' : null;
      },
    );

    final httpLink = HttpLink(kBackendUrl);
    final link = authLink.concat(httpLink);

    return GraphQLClient(
      link: link,
      cache: GraphQLCache(store: InMemoryStore()),
    );
  }

  static ValueNotifier<GraphQLClient> buildClientNotifier() {
    final authLink = AuthLink(
      getToken: () async {
        final t = await _storage.read(key: 'jwt_token');
        return t != null ? 'JWT $t' : null;
      },
    );

    final httpLink = HttpLink(kBackendUrl);
    final link = authLink.concat(httpLink);

    return ValueNotifier(
      GraphQLClient(
        link: link,
        cache: GraphQLCache(store: InMemoryStore()),
      ),
    );
  }
}

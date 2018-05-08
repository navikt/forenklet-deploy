package no.nav.fo.forenkletdeploy.util

import org.glassfish.jersey.client.ClientConfig

import javax.ws.rs.client.ClientBuilder
import javax.ws.rs.client.WebTarget
import java.io.IOException
import java.io.InputStream

object Utils {
    private val objectMapper = createObjectMapper()

    fun getRequiredProperty(propName: String): String {
        val envProp = System.getenv(propName)
        return envProp ?: System.getProperty(propName, "")
    }

    fun withClient(uri: String): WebTarget {
        val client = ClientBuilder.newBuilder()
                .sslContext(SSLUtil.getInsecureSSLContext())
                .withConfig(ClientConfig().register(JsonProvider::class.java))
                .hostnameVerifier { _, _ -> true }
                .build()
        return client.target(uri)
    }

    @Throws(IOException::class)
    fun <T> fromJson(json: String, valueClass: Class<T>): T {
        return objectMapper.readValue(json, valueClass)
    }

    @Throws(IOException::class)
    fun <T> fromJson(json: InputStream, valueClass: Class<T>): T {
        return objectMapper.readValue(json, valueClass)
    }

    fun getEnvironment(): String =
            System.getenv("FASIT_ENVIRONMENT_NAME") ?: "local"

    fun stringToSeed(text: String): Long =
            text.map { it.toLong() }
                    .fold(11L) { acc, i -> (acc * 31 ) + i }
}

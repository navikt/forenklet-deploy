package no.nav.fo.forenkletdeploy.util

fun stringToSeed(text: String): Long =
        text.map { it.toInt() }.sum().toLong()

fun mockEnabled() =
        "true".equals(System.getProperty("USE_MOCK"), ignoreCase = true)

fun enableMock() =
        System.setProperty("USE_MOCK", "true")
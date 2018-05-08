package no.nav.fo.forenkletdeploy.util

fun stringToSeed(text: String): Long =
        text.map { it.toLong() }
                .fold(11L) { acc, i -> (acc * 31 ) + i }

fun mockEnabled() =
        "true".equals(System.getProperty("USE_MOCK"), ignoreCase = true)

fun enableMock() =
        System.setProperty("USE_MOCK", "true")
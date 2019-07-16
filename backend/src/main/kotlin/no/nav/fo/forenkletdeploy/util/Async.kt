package no.nav.fo.forenkletdeploy.util

import kotlinx.coroutines.experimental.Dispatchers
import kotlinx.coroutines.experimental.async
import kotlinx.coroutines.experimental.runBlocking

fun <A, B> Iterable<A>.flatMapParallell(f: suspend (A) -> List<B>): List<B> = runBlocking {
    map { async(Dispatchers.IO) { f(it) } }.flatMap { it.await() }
}

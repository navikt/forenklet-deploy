package no.nav.fo.forenkletdeploy.util

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import kotlinx.coroutines.runBlocking

fun <A, B> Iterable<A>.flatMapParallell(f: suspend (A) -> List<B>): List<B> = runBlocking {
    map { async(Dispatchers.IO) { f(it) } }.flatMap { it.await() }
}

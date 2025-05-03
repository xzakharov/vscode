/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { BaseToken } from '../../baseToken.js';
import { FrontMatterValueToken } from './frontMatterToken.js';
import { Word, SpacingToken } from '../../simpleCodec/tokens/index.js';
import { type TSimpleDecoderToken } from '../../simpleCodec/simpleDecoder.js';

/**
 * Token represents a generic sequence of tokens in a Front Matter header.
 */
export class FrontMatterSequence extends FrontMatterValueToken<string, readonly TSimpleDecoderToken[]> {
	/**
	 * @override Because this token represent a generic sequence of tokens,
	 * the type name is represented by the text of sequence itself.
	 */
	public override get valueTypeName(): string {
		return this.text;
	}

	/**
	 * TODO: @legomushroom
	 */
	// TODO: @legomushroom - trim spaces?
	public get cleanText(): string {
		return this.text;
	}

	/**
	 * TODO: @legomushroom
	 */
	// TODO: @legomushroom - unit test
	public trimEnd(): readonly SpacingToken[] {
		const trimmedTokens = [];

		let index = this.childTokens.length - 1;
		while (index >= 0) {
			const token = this.childTokens[index];

			if (token instanceof SpacingToken) {
				trimmedTokens.push(token);
				index--;

				continue;
			}

			break;
		}

		// TODO: @legomushroom
		this.childTokens.length = index + 1;
		if (this.childTokens.length === 0) {
			this.collapseRangeToStart();
			this.childTokens.push(
				new Word(this.range, ''),
			);
		}

		// TODO: @legomushroom
		this.withRange(
			BaseToken.fullRange(this.childTokens),
		);

		// TODO: @legomushroom
		return trimmedTokens.reverse();
	}

	public override toString(): string {
		return `front-matter-sequence(${this.shortText()})${this.range}`;
	}
}
